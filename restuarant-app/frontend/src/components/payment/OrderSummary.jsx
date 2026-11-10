export default function OrderSummary() {
    const items = [
        {
            id: 1,
            name: "Pepperoni Pizza",
            price: 299.99,
            quantity: 2
        },
        {
            id: 2,
            name: "Pasta and meatballs",
            price: 54.33,
            quantity: 1
        }
    ];

    const subtotal = items.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    const delivery = 35;
    const total = subtotal + delivery;

    return (
        <aside className="h-fit rounded-3xl bg-[#5a311d] p-6 text-white shadow-xl">
            <h2 className="text-2xl font-semibold">
                Your order
            </h2>
            <div className="mt-6 space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold">
                                {item.name}
                            </p>
                            <p className="text-sm text-white/80">
                                {item.quantity}
                            </p>
                        </div>
                        <span>
                            R{(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
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