import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({ error, ...props }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="relative">
                <input 
                    {...props}
                    type={showPassword ? "text" : "password"}
                    className={
                        `h-14 w-full rounded-2xl border-2 bg-[#ece8e8] px-5
                        pr-14 outline-none transition hover:bg-white
                        ${error ? "border-red-700" : "bg-transparent"}`
                    }
                />

                <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>
            </div>

            {error && (
                <p className="mt-2 pl-2 text-sm text-red-900">{error}</p>
            )}
        </>
    )
}