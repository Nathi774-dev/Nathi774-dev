import { useCart } from "../../context/CartContext";

export default function OrderSummary() {
    const { cartItems, subtotal } = useCart();

    const delivery = 35;
    const total = subtotal + delivery;

    return (
        <aside className="h-fit rounded-3xl bg-[#5a311d] p-6 text-white shadow-xl">
            <h2 className="text-2xl font-semibold">
                Your order
            </h2>
            <div className="mt-6 space-y-4">
                {cartItems.length === 0 ? (
                    <p className="text-sm text-white/70">
                        Your cart is empty.
                    </p>
                ) : (
                    cartItems.map(item => (
                        <div 
                            key={item._id}
                            className="flex items-center justify-between gap-4"
                        >
                            <div>
                                <p className="font-semibold">
                                    {item.name}
                                </p>
                                <p className="text-sm text-white/80">
                                    Quantity: {item.cartQuantity}
                                </p>
                            </div>
                            <span className="shrink-0">
                                R{(Number(item.price) * item.cartQuantity).toFixed(2)}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <div className="my-6 border-t border-white/20" />
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-white/70">
                        Subtotal
                    </span>
                    <span>
                        R{subtotal.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-white/70">
                        Delivery
                    </span>
                    <span>
                        R{delivery}
                    </span>
                </div>
            </div> 

            <div className="my-6 border-t border-white/20" />
            <div className="flex items-center justify-between text-xl font-bold">
                <span>Total</span>
                <span>
                    R{total.toFixed(2)}
                </span>
            </div>
        </aside>
    )

}