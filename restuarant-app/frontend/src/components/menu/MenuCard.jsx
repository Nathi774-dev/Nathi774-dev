import { Heart, Plus, Star } from "lucide-react";
import { useFavourites } from "../../context/FavouriteContext";

export default function MenuCard({ item, onAddToCart }) {
    const {favourites, toggleFavourites, isFavourite} = useFavourites();
    const favourite = isFavourite(item.id)
    return (
        <article
            className="
                overflow-hidden rounded-3xl bg-white shadow-lg 
                transition-all duration-300 hover:-translate-y-2 
                hover:shadow-2xl
            "
        >
            <img 
                src={item.image} 
                alt={item.name} 
                className="h-52 w-full object-cover transition duration-500 hover:scale-110"
            />
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {item.name}
                    </h2>
                    <button
                        onClick={() => toggleFavourites(item)}
                        className="
                            rounded-full
                            p-2
                            transition-all
                            duration-300
                            hover:bg-stone-100
                            active:scale-90
                        "
                    >
                        <Heart
                            size={22} 
                            className={
                                favourite ? 'fill-red-500 text-red-500' : 'text-stone-600'
                            }
                        />
                    </button>
                </div>
                <p className="mt-3 text-sm text-stone-600">
                    {item.desc}
                </p>
                <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Star size={18} className="fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}</span>
                    </div>
                    <span className="font-bold text-[#d96d2d]">R{item.price}</span>
                </div>
                <button 
                    className="
                        mt-6 flex w-full items-center justify-center gap-2 rounded-xl
                        bg-[#5a311d] py-3 font-semibold text-white transition hover:bg-[#d96d2d]
                    "
                    onClick={() => onAddToCart(item)}
                >
                    <Plus size={18} />
                    Add to cart
                </button>
            </div>
        </article>
    )
}