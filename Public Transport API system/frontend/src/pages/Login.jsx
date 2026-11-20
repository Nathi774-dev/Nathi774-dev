import { authenticate } from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowForm from "../components/forms/ShowForm";
import FormInput from "../components/forms/FormInput";
import HomeNavbar from "../components/HomeNavbar"

// input attributes
export const emailInput = {
    id: "email",
    name: "email",
    placeholder: "type your email",
    required: true,
    autoComplete: "email"
}

export const passwordInput = {
    id: "password",
    type: "password",
    name: "password",
    placeholder: "type in your password",
    required: true
}

// label attributes
export const emailLabel = {htmlFor: "email"}
export const passwordLabel = {htmlFor: "password"}

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!formData.email.trim() || !formData.password.trim()) {
            setError("Please enter your details before you submit")
            return;
        }
        setIsLoading(true);

        try {
            await authenticate.login(
                formData.email.trim(),
                formData.password
            );
            navigate("/dashboard", { replace: true })
        } catch (err) {
            const status = err.response?.status;
            const detail = err.response?.data?.detail;

            if (!err.response) {
                setError("Unable to connect to the server. Please try again.");
            } else if (status === 401) {
                setError("Invalid email or password. Please check your credentials");
            } else if (status === 404) {
                setError("No account was found with this email address");
            } else {
                setError(typeof detail === "string" ? detail : "Login failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <HomeNavbar links={[]}/>
            <main className="min-h-calc[(100vh-56px)] bg-[#78c850] px-6 py-25">
                <section className="mx-auto w-full max-w-115 pt-4">
                    <h1 className="mb-10 text-center text-3xl font-bold tracking-wide text-white ">
                        Login
                    </h1>
                    <ShowForm 
                        submit="Sign in"  
                        moveTo="/signup" 
                        question="Don't have an account yet?"
                        action="Create your account now."
                        submission={handleSubmit}
                        isError={error}
                        loading={isLoading}
                    >
                        <FormInput 
                            forgotLink="/forgot-email"
                            linkText="Forgot your email?"
                            inputProps={{ ...emailInput, value: formData.email }}
                            labelProps={emailLabel}
                            onchange={handleChange}
                        >Email</FormInput>

                        <FormInput 
                            forgotLink="/forgot-password" 
                            linkText="Forgot your password?"
                            inputProps={{ ...passwordInput, value: formData.password }}
                            labelProps={passwordLabel}
                            onchange={handleChange}
                        >
                            Password
                        </FormInput>

                        {/* These fields are for access control */}
                    </ShowForm>
                </section>
            </main>
        </>
    )
}

export default Login;