import { useState } from "react";
import {Link, useNavigate, Navigate} from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import FormMessage from "../components/FormMessage";

function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const [form, setForm] = useState({email: "", password: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("/auth/login", form);
            login(response.data.access_token);
            setMessage("Login successful");
            setMessageType("success");

            navigate("/");
        } catch (err) {
            console.log("ERROR: ", err.response?.data);
            console.log("STATUS: ", err.response?.status);
            setMessage(err.response?.data?.detail || "Invalid email or password");
            setMessageType("error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <Card>
                <h1>Welcome Back</h1>
                <p>Login to manage your job applications.</p>

                <FormMessage message={message} type={messageType} />

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
                    {isLoading ? "Logging in..." : "Log in your account"}
                    </Button>
                </form>

                <div className="auth-footer">
                    No account yet? <Link to="/register"> Register</Link>
                </div>
            </Card>
        </main>
    )
}

export default Login;