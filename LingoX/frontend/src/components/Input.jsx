import ToggleButton from "./ToggleButton";

export default function Input({ htmlFor, children, inputProps, wrapper = null, setToggleValue, toggleValue }) {
    return (
        <div className="auth-field">
            {wrapper ? (
                <>
                    <label htmlFor={htmlFor}>{children}</label>
                    <div className={wrapper}>
                        <input
                            {...inputProps}
                        />
                        <ToggleButton
                            toggleValue={toggleValue}
                            buttonProps={{
                                type: "button",
                                className: "password-toggle",
                                onClick: () => setToggleValue(!toggleValue),
                                ariaLabel: (toggleValue ? "Hide password" : "Show password")
                            }}
                        />
                    </div>
                </>
            ) : (
                <>
                    <label htmlFor={htmlFor}>{children}</label>
                    <input
                    {...inputProps}
                    />
                </>
            )}
        </div>
    )
}