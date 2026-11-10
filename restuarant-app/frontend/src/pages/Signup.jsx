import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, User, Key } from "lucide-react";
import AuthTitle from "../components/auth/AuthTitle";
import AuthButton from "../components/auth/AuthButton";
import FloatingIcons from "../components/FloatingIcons";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";

const initialForm = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agree: false
}

function SignUp() {
    const [formData, setFormData] = useState(initialForm);
    const [error, setError] = useState({});

    function handleChange(e) {
        const {value, name, type, checked} = e.target;
        setFormData((currentForm) => ({
            ...currentForm,
            [name]: type === "checked" ? checked : value
        }));

        setError((currentError) => ({
            ...currentError,
            [name]: ""
        }))
    }

    function validateForm() {
        const nextErrors = {}

        // if there is no name when whitespace is removed
        if (!formData.fullName.trim()) {
            nextErrors.fullName = "Please enter your full name first";
        }

        // if there is no email or the email is incorrect
        if (!formData.email.trim()) {
            nextErrors.email = "Please enter your email address";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            nextErrors.email = "Make sure your email is corect";
        }

        // the phone number is also mandatory
        if (!formData.phoneNumber.trim()) {
            nextErrors.phoneNumber = "Your phone number is also mandatory";
        }

        // to check if you password is long enough or is filled in
        if (!formData.password.trim()) {
            nextErrors.password = "Please provide a valid password";
        } else if (formData.password.length < 6 && formData.password.length > 17) {
            nextErrors.password = "Your password must be between 7 or 16 characters in length";
        }

        // to check if the passwords match
        if (!formData.confirmPassword.trim()) {
            nextErrors.confirmPassword = "Please re-enter your password";
        } else if (formData.confirmPassword !== formData.password) {
            nextErrors.confirmPassword = "Your password do not match";
        }

        if (!formData.agree) {
            nextErrors.agree = "You must agree to terms and conditions";
        }

        return nextErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        console.log(formData);
        // send to the backend later
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#E98A53] px-6 py-10">
            <FloatingIcons />
            <AuthLayout>
                <section className="relative z-10 w-full max-w-md px-4 sm:px-6 animate-[loginPullUp_1.8s_cubic_bezier(0.16,1.0.3,1)_both]">
                    <AuthTitle title='Create Your Account Today' subtitle="Enter your details if it's your first time" />
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AuthInput 
                            icon={User}
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            error={error.fullName}
                            placeholder="Please enter your full name"
                        />

                        <AuthInput 
                            icon={Mail}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={error.email}
                            placeholder="Please enter your email address"
                        />

                        <AuthInput 
                            icon={Phone}
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            error={error.phoneNumber}
                        />

                        <PasswordInput
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={error.password}
                            placeholder="Enter password that is between 7 and 16 characters long"
                        />

                        <PasswordInput 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={error.confirmPassword}
                            placeholder="Please confirm the password you entered"
                        />

                        <div>
                            <label className="flex items-center gap-3 text-white text-sm">
                                <input 
                                    type="checkbox"
                                    namw="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="h-4 w-4 accent-black"
                                />
                                I agree to the terms and conditions.
                            </label>
                            {error.agree && (
                                <p className="mt-4 text-red-900 text-sm">
                                    {error.agree}
                                </p>
                            )}
                        </div>

                        <AuthButton>
                            Create a New account
                        </AuthButton>
                        <p className="text-white text-center text-sm">
                            Alread have an account?{" "}
                        </p>
                        <Link to="/login" className="font-semibold hover:underline text-black">
                            Login
                        </Link>
                    </form>
                </section>
            </AuthLayout>
        </main>
    )
}

export default SignUp;