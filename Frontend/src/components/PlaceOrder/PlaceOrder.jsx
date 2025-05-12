import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
                if (payChanguLoaded && window.PaychanguCheckout) {
                    setTimeout(()=>{
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
                        callback_url: `${url}/api/order/verify/paychangu?tx_ref=${tx_ref}`,
                        return_url: `${window.location.origin}/verify?success=true&tx_ref=${tx_ref}&orderId=${orderId}&paymentMethod=paychangu`,
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
                    },100);
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
        if (!token) {
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    });



    return (
            <form onSubmit={paymentMethod === "stripe" ? placeOrder : handlePlaceOrder} className='place-order'>
                <div className="place-order-left">
                    <p className='title'>Delivery Information</p>
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
                    <div className="cart-total">
                        <h2>Order Summary</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>$ {getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery fee</p>
                                <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>$ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                            </div>
                        </div>
                        <div className="payment-method-select">
                            <label htmlFor="paymentMethod">Payment Method:</label>
                            <select
                                id="paymentMethod"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="stripe"> Pay with Card (Stripe)</option>
                                <option value="paychangu"> Mobile Money (PayChangu)</option>
                            </select>
                        </div>
                        <div className="payment-method-select">
                            <button
                                type="submit"
                                disabled={paymentMethod === "paychangu" && !payChanguLoaded}
                            >
                                {paymentMethod === "paychangu" && !payChanguLoaded
                                    ? "Loading PayChangu..."
                                    : "PROCEED TO PAYMENT"}
                            </button>
                            {paymentMethod === "paychangu" && payChanguFailed && (
                                <p style={{ color: 'red', marginTop: '10px' }}>
                                    Failed to load PayChangu. Please check your connection or try a different method.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            

    )
}

export default PlaceOrder