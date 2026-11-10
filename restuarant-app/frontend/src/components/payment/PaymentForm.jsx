import { Lock, CreditCard } from "lucide-react";
import PaymentInput from "./PaymentInput";

export default function PaymentForm({paymentData, onChange, onSubmit}) {
    return (
        <section className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-stone-900">
                    Payment Details
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                    Enter your card information below.
                </p>
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
                <PaymentInput 
                    label="Cardholder Name" 
                    name="cardName" 
                    value={paymentData.cardName}
                    onChange={onChange}
                    placeholder="Please enter the name on your card"
                />
                <PaymentInput 
                    label="Bankcard Number" 
                    name="cardNumber" 
                    value={paymentData.cardNumber}
                    type="number"
                    onChange={onChange}
                    placeholder="Please enter the number at the back of your card"
                    maxLength={19}
                />
                <div className="grid grid-cols-2 gap-4">
                    <PaymentInput 
                        label="Expiry date" 
                        name="expiryDate" 
                        value={paymentData.expiryDate}
                        onChange={onChange}
                        placeholder="MM / YY"
                        maxLength={5}
                    />
                    <PaymentInput 
                        label="CVV" 
                        name="cvv" 
                        value={paymentData.cvv}
                        onChange={onChange}
                        placeholder="Please enter your 3 digit security code (CVV)"
                        type="password"
                        maxLength={4}
                    />
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-900">
                    <Lock size={14} />
                    Your payment information is securely handled.
                </div>
                <button
                    type="submit"
                    className="
                        flex
                        h-14
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-[#5a311d]
                        font-semibold
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-[#d96]
                        hover:shadow-xl
                        active:translate-y-0
                    "
                >
                    <CreditCard size={20} />
                    Pay Now
                </button>
            </form>
        </section>
    )
}