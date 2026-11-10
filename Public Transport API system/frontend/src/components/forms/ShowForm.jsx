import SubmitButton from "./SubmitButtons";

export default function ShowForm({ 
    children, 
    submit, 
    moveTo, 
    question, 
    action, 
    submission,
    loading,
    isError
}) {
    return (
        <form className="space-y-5" onSubmit={submission}>
            {/* Only render children if there is no error */}
            {isError && <p className="text-red-700">{isError}</p>}
            {/* Unnecessary prop drilling was used here, but it won't cause problems */}
            {children}
            <SubmitButton submitText={submit} route={moveTo} routeText={action} loading={loading}>
                {question + "  "}
            </SubmitButton> 
        </form>
    )
}