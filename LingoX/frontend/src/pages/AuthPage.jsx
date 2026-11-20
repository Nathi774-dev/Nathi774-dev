
import { useState } from "react";
import {
    BookOpen,
    Globe,
    ArrowRight,
    CheckCircle
} from "lucide-react";

import Input from "../components/Input";

function AuthPage() {
    const [mode, setMode] = useState("signup");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

        setError("");
        setMessage("");
    }

    function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setMessage("");

        if (mode === "signup") {
            if (form.password !== form.confirmPassword) {
                setError("Your passwords do not match.");
                return;
            }

            if (form.password.length < 8) {
                setError("Your password must be at least 8 characters long.");
                return;
            }
        }

        // Frontend demonstration only.
        // Backend authentication will be connected later.
        setMessage(
            mode === "signup"
                ? "Your signup form is valid!"
                : "Your login form is valid!"
        );
    }

    function switchMode(nextMode) {
        setMode(nextMode);
        setError("");
        setMessage("");
    }

    return (
        <div className="auth-page">
            <div className="auth-decoration auth-decoration-one" />
            <div className="auth-decoration auth-decoration-two" />

            <div className="auth-container">

                {/* BRAND */}
                <div className="auth-brand">
                    <div className="auth-logo">
                        <BookOpen size={28} />
                    </div>

                    <h1>
                        Lingo<span>X</span>
                    </h1>
                </div>

                {/* AUTH CARD */}
                <div className="auth-card">

                    <div className="auth-heading">
                        <div className="auth-language-icon">
                            <Globe size={25} />
                        </div>

                        <h2>
                            {mode === "signup"
                                ? "Start your language journey!"
                                : "Welcome back!"
                            }
                        </h2>

                        <p>
                            {mode === "signup"
                                ? "Create an account and start learning today."
                                : "Continue where your language journey left off."
                            }
                        </p>
                    </div>

                    {/* SLIDING AUTH TABS */}
                    <div className={`auth-tabs ${
                        mode === "signup"
                            ? "signup-active"
                            : "login-active"
                    }`}>

                        <div className="auth-tab-indicator" />

                        <button
                            type="button"
                            className={mode === "login" ? "active" : ""}
                            onClick={() => switchMode("login")}
                        >
                            Log In
                        </button>

                        <button
                            type="button"
                            className={mode === "signup" ? "active" : ""}
                            onClick={() => switchMode("signup")}
                        >
                            Sign Up
                        </button>

                    </div>

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                    >

                        {mode === "signup" && (
                            <Input
                                htmlFor="username"
                                inputProps={{
                                    id: "username",
                                    name: "username",
                                    type: "text",
                                    placeholder: "Choose a username",
                                    value: form.username,
                                    onChange: handleChange,
                                    required: true
                                }}
                            >
                                Username
                            </Input>
                        )}

                        <Input
                            htmlFor="email"
                            inputProps={{
                                id: "email",
                                name: "email",
                                type: "email",
                                placeholder: "you@example.com",
                                value: form.email,
                                onChange: handleChange,
                                required: true
                            }}
                        >
                            Email address
                        </Input>

                        <Input
                            htmlFor="password"
                            wrapper="password-wrapper"
                            toggleValue={showPassword}
                            setToggleValue={setShowPassword}
                            inputProps={{
                                id: "password",
                                name: "password",
                                type: showPassword ? "text" : "password",
                                placeholder: "Enter your password",
                                value: form.password,
                                onChange: handleChange,
                                required: true,
                                minLength: mode === "signup" ? 8 : undefined
                            }}
                        >
                            Password
                        </Input>

                        {mode === "signup" && (
                            <Input
                                htmlFor="confirmPassword"
                                wrapper="password-wrapper"
                                toggleValue={showConfirmPassword}
                                setToggleValue={setShowConfirmPassword}
                                inputProps={{
                                    id: "confirmPassword",
                                    name: "confirmPassword",
                                    type: showConfirmPassword
                                        ? "text"
                                        : "password",
                                    placeholder: "Enter your password again",
                                    value: form.confirmPassword,
                                    onChange: handleChange,
                                    required: true
                                }}
                            >
                                Confirm password
                            </Input>
                        )}

                        {mode === "login" && (
                            <button
                                type="button"
                                className="forgot-password"
                                onClick={() =>
                                    setMessage(
                                        "Password recovery will be added later."
                                    )
                                }
                            >
                                Forgot Password?
                            </button>
                        )}

                        {error && (
                            <div className="auth-message auth-error">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="auth-message auth-success">
                                <CheckCircle size={19} />
                                <span>{message}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="auth-submit"
                        >
                            {mode === "signup"
                                ? "Create account"
                                : "Log in"
                            }

                            <ArrowRight size={19} />
                        </button>

                    </form>
                </div>

                <p className="auth-footer">
                    Learn a language. Connect with the world. 🌍
                </p>

            </div>
        </div>
    );
}

export default AuthPage;
