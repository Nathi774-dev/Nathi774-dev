import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PaymentForm from "../components/payment/PaymentForm";
import PaymentHeader from "../components/payment/PaymentHeader";
import OrderSummary from "../components/payment/OrderSummary";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Payment() {
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const { user } = useAuth();
    const [customerData, setCustomerData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: "",
        address: ""
    })
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // To wait for the user details to load
    useEffect(() => {
        if (user) {
            setCustomerData(currentData => ({
                ...currentData,
                name: user?.name || currentData.name,
                email: user?.email || currentData.email
            }))
        }
    }, [user])

    async function handleSubmit(e) {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty");
            navigate("/cart");
            return;
        }

        setLoading(true);

        try {
            // Sends customer details to the backend

        } catch (err) {
            // catch errors and print them on the console

        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#e98a53] px-6 py-8">
            <PaymentHeader onBack={() => navigate(-1)} />
            <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols[1fr_360px]">
                <PaymentForm 
                    customerData={customerData} 
                    onChange={handleChange} 
                    onSubmit={handleSubmit} 
                    loading={loading}
                />
                <OrderSummary />
            </div>
        </main>
    )
}

export default Payment;