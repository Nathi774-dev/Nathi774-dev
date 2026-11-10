export default function AuthInput({ icon: Icon, error, className = "", ...props }) {
    return (
        <>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500" />
                )}

                <input 
                    {...props}
                    className={
                        `h-14
                        w-full rounded-2xl border-2 bg-[#ECE8E8] text-base outline-none
                        transition duration-300 placeholder:text-stone-500 hover:bg-white
                        focus:border-white focus:shadow-xl ${Icon ? "pl-14 pr-5" : "px-5"}
                        ${error ? "border-red-700" : "border-transparent"}
                        ${className}`
                    }
                />
            </div>

            {error && (
                <p className="mt-2 pl-2 text-sm font-medium text-red-900">
                    {error}
                </p>
            )}
        </>
    )
}