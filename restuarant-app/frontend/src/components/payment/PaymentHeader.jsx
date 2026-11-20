import { ArrowLeft, CreditCard } from "lucide-react";

export default function PaymentHeader({ onBack }) {
    return (
        <header className="mx-auto max-w-6xl">
            <button
                type="button"
                onClick={onBack}
                className="
                    flex
                    items-center
                    gap-2
                    text-stone-700
                    transition
                    hover:text-black
                "
            >
                <ArrowLeft size={20} />
                Back to cart
            </button>
            <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5a311d] text-white">
                    <CreditCard size={24} />
                </div>
                <div>
                    <h1 className="font-serif text-5xl text-[#3e1f12]">
                        Payment
                    </h1>
                    <p className="mt-1 text-stone-700">
                        Complete your order safely.
                    </p>
                </div>
            </div>
        </header>
    )
}