import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PaymentForm from "../components/payment/PaymentForm";
import PaymentHeader from "../components/payment/PaymentHeader";
import OrderSummary from "../components/payment/OrderSummary";

function Payment() {
    const navigate = useNavigate();

    const [paymentData, setPaymentData] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setPaymentData(prevData => ({
            ...prevData,
            [name]: value 
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log("Payment details: ", paymentData);

        // TODO: connect to the backend
        navigate("/order-success");
    }

    return (
        <main className="min-h-screen bg-[#e98a53] px-6 py-8">
            <PaymentHeader onBack={() => navigate(-1)} />
            <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols[1fr_360px]">
                <PaymentForm paymentData={paymentData} onChange={handleChange} onSubmit={handleSubmit} />
                <OrderSummary />
            </div>
        </main>
    )
}

export default Payment;