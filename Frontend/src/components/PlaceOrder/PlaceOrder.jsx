import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../PageHeader/PageHeader'
import { ArrowRight, ShieldIcon } from '../Icons/Icons'

const PlaceOrder = () => {

    const { getTotalCartAmount, token, product_list, cartItems, url } = useContext(StoreContext);
    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const [payChanguLoaded, setPayChanguLoaded] = useState(false);
    const [payChanguFailed, setPayChanguFailed] = useState(false);


    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })



    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        product_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
            paymentMethod
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        }
        else {
            alert("Error")
        }

    }

    const handlePlaceOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];
        product_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
            paymentMethod
        };

        try {

            orderData.tx_ref = `tx-${Date.now()}`;
            const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { orderId, tx_ref } = response.data;

                console.log("Launching PayChangu with:", {
                    orderData,
                    customer: {
                        email: data.email,
                        first_name: data.firstName,
                        last_name: data.lastName,
                        tx_ref
                    },
                    orderId
                });

                // PaychanguCheckout({
                //     email: user.email,
                //     first_name: user.firstName,
                //     last_name: user.lastName,
                //     orderId, // must not be undefined!
                //     tx_ref,
                //     amount: orderData.amount,
                // });

                //Dynamic open PayChangu payment popup

                const redirectParams = `?success=true&tx_ref=${response.data.tx_ref}&paymentMethod=paychangu`;
                if (payChanguLoaded && window.PaychanguCheckout) {
                    setTimeout(() => {
                        if (!document.body) {
                            console.error("document.body not available");
                            alert("Something went wrong loading payment interface.")
                        }
                    })
                    window.PaychanguCheckout({
                        public_key: "pub-test-PKUkU9yJ9FDzEcEyIVl3kdpRyLuKGOot",
                        tx_ref: tx_ref,
                        amount: orderData.amount,
                        currency: "MWK",
                        callback_url: `${window.location.origin}/myorders${redirectParams}`,
                        return_url: `${window.location.origin}/myorders${redirectParams}`,
                        customer: {
                            email: data.email,
                            first_name: data.firstName,
                            last_name: data.lastName,
                        },
                        customization: {
                            title: "Order Payment",
                            description: "PayChangu Checkout",
                        },
                        meta: {
                            uuid: orderId,
                        }
                    }, 100);
                } else {
                    setPayChanguFailed(true);
                    alert("PayChangu is not available.Please try again later.");
                    console.error("PayChanguCheckour is not defined");

                }

            } else {
                alert("Order failed to place");
            }
        } catch (error) {
            console.error("PayChangu error:", error?.response?.data || error.message || error);
            alert("Something went wrong");
        }
    }

    useEffect(() => {
        const loadScripts = () => {
            if (!window.$) {
                const jQueryScript = document.createElement('script');
                jQueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
                jQueryScript.async = true;

                jQueryScript.onload = () => {
                    console.log("jQuery loaded, now loading PayChangu");

                    loadPayChanguScript(); // load after jQuery
                };

                jQueryScript.onerror = () => {
                    console.error("Failed to load jQuery");
                    setPayChanguLoaded(false);
                };

                document.body.appendChild(jQueryScript);
            } else {
                loadPayChanguScript(); // jQuery already available
            }
        };

        const loadPayChanguScript = () => {
            if (!window.PaychanguCheckout) {
                const payChanguScript = document.createElement('script');
                payChanguScript.src = "https://checkout.paychangu.com/popup.js";
                payChanguScript.async = true;

                payChanguScript.onload = () => {
                    console.log("PayChangu script loaded successfully");
                    setPayChanguLoaded(true);
                };

                payChanguScript.onerror = () => {
                    console.error("Failed to load PayChangu script");
                    setPayChanguLoaded(false);
                };

                document.body.appendChild(payChanguScript);
            } else {
                console.log("PayChangu already loaded");
                setPayChanguLoaded(true);
            }
        };

        if (paymentMethod === "paychangu") {
            loadScripts();
        }

    }, [paymentMethod]);

    const navigate = useNavigate();
    useEffect(() => {
        if (!token || getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate]);



    return (
        <div className="checkout">
            <PageHeader
                crumb="Checkout"
                title="Secure"
                accent="Checkout"
                text="Tell us where to deliver your order, then choose how you'd like to pay."
            />
            <form onSubmit={paymentMethod === "stripe" ? placeOrder : handlePlaceOrder} className='place-order page-layout'>
                <div className="place-order-left">
                    <p className='title'><span>1</span> Delivery Information</p>
                    <div className="multi-fields">
                        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                    </div>
                    <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
                    <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
                    <div className="multi-fields">
                        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                    </div>
                    <div className="multi-fields">
                        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
                    </div>
                    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
                </div>
                <div className="place-order-right">
                    <div className="summary-card">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <p>Subtotal</p>
                            <p>$ {getTotalCartAmount()}</p>
                        </div>
                        <div className="summary-row">
                            <p>Delivery fee</p>
                            <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <div className="summary-row total">
                            <b>Total</b>
                            <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                        <fieldset className="payment-method-select">
                            <legend><span>2</span> Payment Method</legend>
                            <label className={paymentMethod === "stripe" ? "selected" : ""}>
                                <input type="radio" name="paymentMethod" value="stripe"
                                    checked={paymentMethod === "stripe"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <div><b>Pay with Card</b><small>Card payment via Stripe</small></div>
                            </label>
                            <label className={paymentMethod === "paychangu" ? "selected" : ""}>
                                <input type="radio" name="paymentMethod" value="paychangu"
                                    checked={paymentMethod === "paychangu"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <div><b>Mobile Money</b><small>Mobile money via PayChangu</small></div>
                            </label>
                        </fieldset>
                        <button
                            type="submit"
                            className="btn-red"
                            disabled={paymentMethod === "paychangu" && !payChanguLoaded}
                        >
                            {paymentMethod === "paychangu" && !payChanguLoaded
                                ? "Loading PayChangu..."
                                : <>Proceed to payment <ArrowRight size={16} /></>}
                        </button>
                        {paymentMethod === "paychangu" && payChanguFailed && (
                            <p className="payment-error">
                                Failed to load PayChangu. Please check your connection or try a different method.
                            </p>
                        )}
                        <p className="summary-note"><ShieldIcon size={16} /> Secure checkout</p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder