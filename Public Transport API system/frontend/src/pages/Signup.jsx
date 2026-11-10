import { authenticate } from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordInput, emailInput, passwordLabel, emailLabel } from "./Login";
import FormInput from "../components/forms/FormInput";
import ShowForm from "../components/forms/ShowForm";
import HomeNavbar from "../components/HomeNavbar";
import AccountQuestionnaire from "../components/forms/AccountQuestionnaire";

// all other input attributes for other fields besides email and password
const usernameInput = {
    id: "full_name",
    name: "full_name",
    autoComplete: "full_name",
    placeholder: "Type in a username",
    required: true
}

const confirmInput = {
    id: "confirmPassword",
    name: "confirmPassword",
    type: "password",
    required: true,
    placeholder: "Re-type your password here",
}

// all other label attributes for other fields
const usernameLabel = {htmlFor: "full_name"}
const confirmLabel = {
    htmlFor: "confirmPassword"
}

function Signup() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        accountType: '',
        invitationCode: ''
    })
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
           ...prevData,
           [name]: value 
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // validations
        if (!formData.accountType) {
            setError("Please elect an account type");
        }

        if (!formData.companyName.trim()) {
            setError("Please enter company's name.");
        }

        if (formData.password !== formData.confirmPassword) {
            setError("passwords do not match");
            return;
        }
        setIsLoading(true);

        try {
            await authenticate.register({
                username: formData.full_name,
                email: formData.email,
                password: formData.password,
                account_type: formData.accountType,
                invitation_code: formData.invitationCode || null,
                company_name: formData.companyName
            })
            navigate("/login");
        } catch (err) {
            setError(
                err.response?.data?.detail || "Registration failed, please try again."
            )
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <HomeNavbar links={[]} />
            <main className="min-h-calc[(100vh-56px)] bg-[#78c850] px-6 py-25">
                <section className="mx-auto w-full max-w-115 pt-4">
                    <h1 className="mb-10 text-center text-3xl font-bold tracking-wide text-white ">
                        Sign up
                    </h1>
                    <ShowForm 
                        submit="Create new account" 
                        moveTo="/login" 
                        question="Already have an account?"
                        action="Sign in to your account."
                        loading={isLoading}
                        submission={handleSubmit}
                        isError={error}
                    >
                        <FormInput 
                            inputProps={{
                                ...usernameInput,
                                value: formData.full_name
                            }}
                            labelProps={usernameLabel}
                            onchange={handleChange}
                        >Username</FormInput>

                        <FormInput 
                            inputProps={{
                                ...emailInput,
                                value: formData.email
                            }}
                            labelProps={emailLabel}
                            onchange={handleChange}
                        >Email</FormInput>

                        <FormInput 
                            inputProps={{
                                ...passwordInput,
                                value: formData.password
                            }}
                            labelProps={passwordLabel}
                            onchange={handleChange}
                        >Password</FormInput>

                        <FormInput 
                            inputProps={{
                                ...confirmInput,
                                value: formData.confirmPassword
                            }}
                            labelProps={confirmLabel}
                            onchange={handleChange}
                        >Confirm your password</FormInput>
                        <AccountQuestionnaire data={formData} onChange={handleChange} /> 
                    </ShowForm>
                </section>
            </main>
        </>
    )
}

export default Signup;