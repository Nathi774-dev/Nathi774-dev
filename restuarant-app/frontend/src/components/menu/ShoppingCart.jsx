import { ShoppingBag } from "lucide-react";

export default function ShoppingCart({ items = 0, onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                group fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center
                rounded-full bg-[#5a311d] text-white shadow-2xl transition-all duration-300
                hover:bg-[#d96d2d] active:scale-95 hover:w-44 overflow-visible
            "
        >
            <div className="relative flex items-center justify-center transition-all duration-300 group-hover:mr-3">
                <ShoppingBag size={28} />
                {items > 0 && (
                    <span
                        className="
                        absolute -top-2 right-0 translate-x-1/3 -translate-y-1/3 flex
                        h-6 w-6 items-center justify-center rounded-full bg-red-600
                        text-xs font-bold text-white ring-2 ring-[#5a311d]
                        "
                    >
                        {items}
                    </span>
                )}
            </div>
            <span
                className="
                    w-0
                    overflow-hidden
                    whitespace-nowrap
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:w-auto
                    group-hover:opacity-100
                "
            >
                Cart ({items})
            </span>
        </button>
    )
}