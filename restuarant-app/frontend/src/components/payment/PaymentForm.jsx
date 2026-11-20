import { Lock, CreditCard } from "lucide-react";
import PaymentInput from "./PaymentInput";
import PayButton from "./PayButton";

export default function PaymentForm({customerData, onChange, onSubmit, loading = false}) {
    return (
        <section className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-stone-900">
                    Delivery & Payment
                </h2>
                <p className="mt-1 text-sm text-stone-600">
                    Enter your contact information and address
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <PaymentInput
                    name="name"
                    label="Full Name"
                    value={customerData.name}
                    onChange={onChange}
                    readOnly
                />
                <PaymentInput
                    name="email"
                    label="Email"
                    value={customerData.email}
                    onChange={onChange}
                    readOnly
                />
                <PaymentInput
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    value={customerData.phoneNumber}
                    onChange={onChange}
                    required
                    placeholder="Enter your phone number here"
                />
                <PaymentInput
                    name="address"
                    inputType="address"
                    label="Delivery Address"
                    value={customerData.address}
                    onChange={onChange}
                    required
                    placeholder="Street address, city and postal code etc."
                />

                <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Lock size={16} className="mt-0.5 shrink-0" />
                    Your payment will be securely processed by PayFast.
                </div>
                <PayButton isLoading={loading} />
            </form>
        </section>
    )
}