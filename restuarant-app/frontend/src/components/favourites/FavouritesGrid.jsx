import FavouriteCard from "./FavouriteCard";
import { Heart } from "lucide-react";

export default function FavouritesGrid({favourites, onRemoveFavourite, onBrowse}) {
    if (favourites.length === 0) {
        // empty state
        return (
            <section className="mx-auto mt-24 flex max-w-md flex-col items-center text-center">
                <Heart size={20} className="text-stone-500" />
                <h2 className="mt-6 text-2xl font-semibold">
                    No favourites yet.
                </h2>
                <p className="mt-2 text-stone-600">
                    When you find something you love, it gets saved here
                </p>
                <button
                    type="button"
                    onClick={onBrowse}
                    className="
                        mt-7
                        rounded-full
                        px-7
                        py-3
                        font-semibold
                        text-white
                        shadow-lg
                        transition
                        duration-300
                        hover:-translate-y-1
                        hover:bg-[#d96d2d]
                    "
                >Browse Menu</button>
            </section>
        )
    }

    return (
        <section className="mx-auto mt-10 max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {favourites.map((fav) => (
                    <FavouriteCard key={fav.id} item={fav} onRemoveFavourite={onRemoveFavourite} />
                ))}
            </div>
        </section>
    )
}