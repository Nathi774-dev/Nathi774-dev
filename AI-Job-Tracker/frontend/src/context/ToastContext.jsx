import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export function ToastProvider({children}) {
    const [toast, setToast] = useState({
        message: "",
        type: "success"
    });

    function showToast(message, type="success") {
        setToast({message, type});
        setTimeout(() => {
            setToast({
                message: "",
                type: "success"
            })
        }, 3000);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <Toast
                message={toast.message}
                type={toast.type}
            />
        </ToastContext.Provider>
    )
}

export function useToast() {
    return useContext(ToastContext);
}