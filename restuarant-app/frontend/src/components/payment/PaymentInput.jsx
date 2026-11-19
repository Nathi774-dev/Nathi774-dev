export default function PaymentInput({
    label,
    name,
    type = "text",
    value,
    onChange,
    required = false,
    placeholder = "",
    maxLength = 5,
    inputType = "normal",
    readOnly = false
}) {
    return (
        <div>
            <label htmlFor={name} className="mb-2 block text-sm font-medium text-stone-700">
                {label}
            </label>
            {inputType === "normal" ? (
                <input 
                    id={name}
                    name={name}
                    readOnly={readOnly}
                    type={type}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className="
                       w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-[#d96d2d]
                    "
                    required={required}
                    />
                ) : (
                <textarea 
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    className="
                        w-full resize-none rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-[#d96d2d]
                    "
                       
                    rows={3}
                    required={required}
                />
            )}
        </div>
    )
}