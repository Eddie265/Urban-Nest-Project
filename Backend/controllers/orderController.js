import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import axios from 'axios'
import 'dotenv/config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const payChanguSecretKey = process.env.PAYCHANGU_SECRET_KEY;
// placing user order for frontend
const placeOrder = async (req, res) => {


    const frontend_url = "https://urban-nest-7xy8.onrender.com"
    const { userId, items, amount, address, paymentMethod } = req.body;


    try {
        const tx_ref = "changu_" + Date.now();

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod,
            tx_ref: paymentMethod === "PayChangu" ? tx_ref : null,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });


        //For payChangu
        if (paymentMethod === "PayChangu") {
            console.log("Sending orderId to frontend:", newOrder._id);
            return res.json({ success: true, tx_ref, orderId: newOrder._id });
        }

        //For Stripe
        if (paymentMethod === "stripe") {
            const line_items = req.body.items.map((item) => ({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: item.price * 100 * 80
                },
                quantity: item.quantity
            }))

            line_items.push({
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: "Delivery Charges"
                    },
                    unit_amount: 2 * 100 * 80
                },
                quantity: 1
            });
            const session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
            });
            res.json({ success: true, session_url: session.url });
        }
        res.json({ success: true, order: newOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const verifyPayChanguTransaction = async (tx_ref) => {
    try {
        const response = await axios.get(`https://api.paychangu.com/transaction/verify/${tx_ref}`, {
            headers: {
                Authorization: `Bearer ${payChanguSecretKey}`,
            },
        });

        const paymentData = response.data.data;
        return response.data.status === "success" && paymentData.status === "successful";
    } catch (err) {
        console.error("PayChangu verification error:", err.response?.data || err.message);
        return false;
    }
};

const verifyPayChangu = async (req, res) => {
    const { tx_ref } = req.query; // Read from query, not body

    if (!tx_ref) {
        return res.status(400).json({ success: false, message: "Missing tx_ref" });
    }

    try {
        const success = await verifyPayChanguTransaction(tx_ref);
        if (!success) {
            return res.status(400).json({ success: false, message: "Payment not successful" });
        }

        const updatedOrder = await orderModel.findOneAndUpdate(
            { tx_ref },
            { payment: true, paymentMethod: "PayChangu" },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, order: updatedOrder });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === "true") {
            const order = await orderModel.findById(orderId);
            if (!order) return res.json({ success: false, message: "Order not found" });

            if (order.paymentMethod === "PayChangu") {
                const verified = await verifyPayChanguTransaction(order.tx_ref);
                if (!verified) {
                    return res.json({ success: false, message: "PayChangu Payment Verification Failed" });
                }
            }

            await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Item Processing" });
            return res.json({ success: true, message: "Item Processing" });

        } else {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: "Payment Failed" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error verifying order" });
    }
};

// user orders for front end
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, verifyPayChangu }

