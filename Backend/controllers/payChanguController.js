import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import axios from 'axios'
import dotenv from 'dotenv/config'


const payChanguSecret = process.env.PAYCHANGU_SECRET_KEY;
// Create order & initiate PayChangu payment session

const placePayment = async (req, res) => {

    const frontend_url = "http://localhost:5174"

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Calculate total amount
        const totalAmount = req.body.amount;

        const response = await axios.post(
            "https://api.paychangu.com/payment",
            {
                amount: totalAmount,
                currency: "MWK",
                email: req.body.email,
                first_name: req.body.first_name || "First",
                last_name: req.body.last_name || "Last",
                callback_url: `${frontend_url}/verify-callback`,
                return_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                tx_ref: `order_${newOrder._id}`,
                customization: {
                    title: "Order Payment",
                    description: "Payment for your order"
                },
                meta: {
                    userId: req.body.userId,
                    orderId: newOrder._id
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${payChanguSecret}`
                }
            }
        );

        // Redirect user to PayChangu
        const redirectUrl = response.data?.data?.link;
        res.json({ success: true, redirect_url: redirectUrl });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


export { placePayment };