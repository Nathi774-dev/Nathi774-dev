import { Heart, Plus, Star } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function FavouriteCard({ item, onRemoveFavourite }) {
    const { addToCart } = useCart();

    return (
        <article className="
            overflow-hidden
            rounded-3xl
            bg-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-2
            hover:shadow-2xl
        ">
            {/* Image */}
            <div className="relative overflow-hidden">
                <img src={item.image} alt={item.name} className="h-52 w-full object-cover transition duration-500 hover:scale-105" />
                {/* Favourite button */}
                <button
                    className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-white/90
                        shadow-lg
                        transition
                        hover:scale-110
                    "
                >
                    <Heart size={20} className="fill-red-600 text-red-600" />
                </button>
            </div>

            {/* Information */}
            <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">
                            {item.name}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-stone-600">
                            {item.desc}
                        </p>
                    </div>
                </div>

                {/* Rating and price */}
                <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Star size={20} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                            {item.rating}
                        </span>
                    </div>
                    <span className="font-bold text-[#d96d2d]">
                        R{Number(item.price).toFixed(2)}
                    </span>
                </div>

                {/* Add to cart */}
                <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="
                        mt-6
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#5a311d]
                        py-3
                        font-semibold
                        text-white
                        transition
                        duration-300
                        hover:bg-[#d96d2d]
                        active:scale-95
                    "
                >
                    <Plus size={18} />
                    Add to cart
                </button>
            </div>
        </article>
    )
}