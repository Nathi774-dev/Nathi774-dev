import { CreditCard } from "lucide-react";

export default function PayButton({ isLoading }) {
    return (
        <button 
            type="submit"
            disabled={isLoading}
            className="
                flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#5a311d]
                font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1
                hover:bg-[#d96d2d] hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed
                disabled:opacity-60
            "
        >
            <CreditCard size={20} />
            {isLoading ? "Processing..." : "Continue to PayFast"}
        </button>
    )
}