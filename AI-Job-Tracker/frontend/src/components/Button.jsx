function Button({
    children,
    type = "button",
    onClick,
    disabled = false
}) {
    return (
        <button
            className="btn btn-primary"
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;