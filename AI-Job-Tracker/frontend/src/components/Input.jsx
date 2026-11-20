function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false
}) {
    return (
        <div className="form-group">
            <label>{label}</label>

            <input 
                className="form-control"
                type={type}
                name={name}
                onChange={onChange}
                required={required}
                value={value}
                placeholder={placeholder}

            />
        </div>
    );
}

export default Input;