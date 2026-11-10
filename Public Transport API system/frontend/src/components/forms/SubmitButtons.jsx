import { Link } from "react-router-dom";

export default function SubmitButton({ 
    children, 
    routeText, 
    submitText, 
    route, 
    loading
}) {
    return (
        <>
            <button 
                className="
                    mt-6 w-full rounded-xl
                    bg-[#3f3f3f] py-3
                    font-semibold text-white
                    transition hover:bg-[#303030]
                "
                disabled={loading}
            >
                {loading ? "Loading..." : submitText}
            </button>
            <p className="text-center text-sm text-[#315b24]">
                {children}
                <Link to={route} className="font-bold text-white hover:underline">
                    {routeText}
                </Link>
            </p>
        </>
    )
}

export function FormSubmitButton({ children }) {
    return (
        <button type="submit" className="rounded-lg bg-[#78c850] px-4 py-2 font-semibold text-white hover:bg-green-600">
            {children}
        </button>
    )
}