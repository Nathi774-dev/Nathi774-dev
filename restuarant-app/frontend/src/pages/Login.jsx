import { useState } from "react";
import {
    Beef, CakeSlice, Croissant, Eye, EyeOff, Grape, Soup, Utensils, Wine, Pizza,
    Mail
} from "lucide-react";
import CheeseIcon from "../assets/icons/cheese.svg";
import ChickenIcon from "../assets/icons/chicken.svg";
import FloatingIcon from "../components/FloatingIcon";
import Steak from "../assets/icons/steak.svg";

import AuthTitle from "../components/auth/AuthTitle";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";
import FloatingIcons from "../components/FloatingIcons";

const initialForm = {
    password: '',
    email: '',
    rememberMe: false
}

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        e.preventDefault();
        const {name, value, type, checked} = e.target;
        setFormData((currentData) => ({
            ...currentData,
            [name]: type === "checkbox" ? checked : value
        }));
        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: ""
        }))
    }

    function validateForm() {
        const nextErrors = {};
        if (!formData.email.trim()) {
            nextErrors.email = "Please enter your email address";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            nextErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            nextErrors.password = "Please enter your password";
        } else if (formData.password.length < 6) {
            nextErrors.password = 'Password must be at least 6 characters long';
        } 

        return nextErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validateErrors = validateForm();
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            return;
        }
        // this should be connected to the backend
        console.log("Login details: ", formData);
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#E98A53] px-6 py-10">
            {/* Floating icon component */}
            <FloatingIcons />

            <AuthLayout>
                <AuthTitle title="Login" subtitle="Welcome back. Sign in to continue." />
                <form onSubmit={handleSubmit} noValidate className="space-y-8">
                    <div className="space-y-6">
                        <AuthInput
                            icon={Mail} 
                            error={errors.email} 
                             id="email" 
                            type="email"
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="Your email" 
                            autoComplete="email" 
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={
                                `h-14 w-full rounded-2xl border-2 bg-[#ece8e8] pl-14
                                pr-5 text-base text-stone-900 outline-none transition duration-300
                                placeholder:text-stone-500 hover:bg-white/95 focus:-translate-y-0.5 focus:bg-white
                                focus:shadow-xl ${errors.email ? "border-red-700" : "border-transparent focus:border-white"}`
                            }
                        />
                    </div>

                    <PasswordInput 
                        error={errors.password}
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Your password"
                        autoComplete="current-password"
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                            errors.password ? "password-error" : undefined
                        }
                        className={
                            `h-14 w-full rounded-2xl border-2 bg-[#ece8e8] 
                            px-5 pr-14 text-base text-stone-900 outline-none transition duration-300 placeholder:text-stone-400
                            hover:bg-white/95 focus:-translate-y-0.5 focus:bg-white focus:shadow-xl
                            ${errors.password ? "border-red-700" : "border-transparent focus:border-white"}`
                        }
                    />
                        

                    <div className="flex items-center justify-between gap-4 text-sm">
                        <label className="flex cursor-pointer items-center gap-2 text-white">
                            <input 
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="h-4 w-4 accent-black rounded"
                            />
                            Remember Me
                        </label>

                        <a href="/forgot-password" className="font-medium text-white transition hover:text-black">
                            Forgot Password?
                        </a>
                    </div>

                    <AuthButton>Login</AuthButton>
                </form>

                <p className="mt-7 text-left text-sm text-white">
                    Don&apos;t have an account?{" "}
                </p>
                <a href="/signup" className="font-semibold text-black underline-offset-4 hover:underline">
                    Create Account
                </a>
            </AuthLayout>
        </main>
    )
}

export default Login;