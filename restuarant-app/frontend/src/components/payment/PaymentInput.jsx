export default function PaymentInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    maxLength
}) {
    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-stone-700">
                {label}
            </label>
            <input 
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                placeholder={placeholder}
                className="
                    h-14
                    w-full
                    rounded-2xl
                    border-2
                    border-transparent
                    bg-[#ecebe8]
                    text-stone-900
                    outline-none
                    transition
                    placeholder:text-stone-400
                    focus:border-white
                    focus:bg-white
                    focus:shadow-lg
                "
            />
        </div>
    )
}