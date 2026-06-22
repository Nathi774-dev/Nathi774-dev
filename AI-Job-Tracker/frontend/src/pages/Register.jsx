import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import api from "../api/axios";

import Button from "../components/Button";
import Card from "../components/Card";
import FormMessage from "../components/FormMessage";
import Input from "../components/Input";

function Register() {
    // some logic to connect our backend
    const navigate = useNavigate();

    const [form, setForm] = useState({email: "", password: ""});
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("")

        try {
            await api.post("/auth/register", form);
            setMessage("Account Successfully created!");
            setMessageType("success");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setMessage(err.message?.data?.detail || "Something went wrong");
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <Card>
                <h1>Create Account</h1>
                <p>Start tracking your job applications with ease.</p>

                <FormMessage 
                    message={message}
                    type={messageType}
                />

                <form onSubmit={handleSubmit}>
                    <Input 
                        label="Email" 
                        type="email" 
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        name="email"
                    />
                    <Input 
                        label="Password"
                        type="password"
                        placeholder="Please type in a secure password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        name="password"
                    />

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Account"}
                    </Button>
                </form>

                <div className="auth-footer">
                    Already have an account?{" "} <Link to="/login"> Login</Link>
                </div>
            </Card>
        </main>
    )
}

export default Register;