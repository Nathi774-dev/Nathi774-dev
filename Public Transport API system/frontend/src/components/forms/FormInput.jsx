import { Link } from "react-router-dom";

export default function FormInput({
    children, 
    forgotLink, 
    linkText, 
    inputProps,
    labelProps,
    onchange
}) {
    return (
        <div>
            {/* Email */}
            <label {...labelProps} className="mb-1 block text-[17px] font-semibold text-[#24451b]">
                {children}
            </label>
            <div className="flex items-center gap-3">
                <input 
                    {...inputProps}
                    onChange={onchange}
                    className="
                        h-10 w-full rounded-full 
                        bg-[#dedede] px-4 text-sm 
                        text-gray-800 outline-none
                        transition focus:ring-2 focus:ring-white
                    "
                />
                {forgotLink && linkText && (
                    <Link 
                        to={forgotLink} 
                        className="
                            mt-5 whitespace-nowrap text-[12px]
                        "
                    >{linkText}</Link>
                )}
            </div>
        </div>
    )
}