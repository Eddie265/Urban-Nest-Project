import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const tx_ref = searchParams.get("tx_ref");
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const paymentMethod = searchParams.get("paymentMethod") || "stripe"
    const { url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const [message, setMessage] = useState("Verifying your payment...");
    const [status, setStatus] = useState("loading");

    const redirectWithMessage = (msg, type, path = "/") => {
        setMessage(msg);
        setStatus(type);
        setTimeout(() => navigate(path), 2000);
    };

    const verifyPayment = async () => {

        if (!success || !orderId) {
            return redirectWithMessage("Missing required parameters. Redirecting...", "error");
        }
        try {


            let response;
            if (paymentMethod === "paychangu") {
                if (!tx_ref) {
                    return redirectWithMessage("Missing tx_ref. Redirecting...", "error");
                }
                response = await axios.get(`${url}/api/order/verify/paychangu`, {
                    params: { tx_ref },
                    headers: { token },
                });
            } else {
                response = await axios.post(`${url}/api/order/verify`, {
                    success,
                    orderId,
                }, {
                    headers: { token },
                });
            }

            if (response.data.success) {
                redirectWithMessage("Payment verified! Redirecting to your orders...", "success", "/myorders");
            } else {
                redirectWithMessage("Payment verification failed. Redirecting...", "error");
            }
        } catch (error) {
            console.error("Verification error:", error.response?.data || error.message);
            redirectWithMessage("An error occurred. Redirecting...", "error");
        }
        // const response = await axios.post(url + "/api/order/verify", { success, orderId })

    };

    useEffect(() => {
        verifyPayment();
    }, [])
    return (
        <>
            <div className='verify'>
                <div className="spinner"></div>
            </div>
            <div className={`verify-message ${status}`}>
                {message}
            </div>
        </>

    )
}

export default Verify