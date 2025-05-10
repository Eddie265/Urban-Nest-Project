import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const tx_ref = searchParams.get("tx_ref");
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const paymentMethod = searchParams.get("paymentMethod") || "stripe"
    const { url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const [message, setMessage] = useState("Verifying your payment...");
    const [status, setStatus] = useState("loading");

    const verifyPayment = async () => {

        if (!success || !orderId) {
            setMessage("Missing required parameters. Redirecting...");
            setStatus("error");
            setTimeout(() => navigate('/'), 2000);
            return;
        }

        try {
            // if (!success || !orderId) {
            //     return navigate('/');
            // }

            let response;
            if (paymentMethod === "paychangu") {
                if (!tx_ref) {
                    setMessage("Missing tx_ref. Redirecting...");
                    setStatus("error");
                    setTimeout(() => navigate('/'), 2000);
                    return;
                }
                response = await axios.post(`${url}/api/order/verify/paychangu`, { tx_ref }, {
                    headers: { token }
                });
            } else {
                if (!success || !orderId) {
                    setMessage("Missing Stripe payment details. Redirecting...");
                    setStatus("error");
                    setTimeout(() => navigate('/'), 2000);
                    return;
                }
                response = await axios.post(`${url}/api/order/verify`, { success, orderId }, {
                    headers: { token },
                });
            }

            if (response.data.success) {
                setMessage(" Payment verified! Redirecting to your orders...");
                setStatus("success");
                setTimeout(() => navigate("/myorders"), 2000);
            }
            else {
                setMessage(" Payment verification failed. Redirecting...");
                setStatus("error");
                setTimeout(() => navigate("/"), 2000);
            }
        } catch (error) {
            console.error("Verification error:", error);
            setMessage(" An error occurred. Redirecting...");
            setStatus("error");
            setTimeout(() => navigate("/"), 2000);
        }
        // const response = await axios.post(url + "/api/order/verify", { success, orderId })

    }

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