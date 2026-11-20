import { ArrowLeft, Heart } from "lucide-react"
import OnBackButton from "../OnBackButton"

export default function FavouritesHeader({ onBack }) {
   return (
    <header className="max-auto max-w-6xl">
        <OnBackButton OnBack={onBack} />
        <div className="mt-8 flex items-center gap-4">
            <div className="
                flex
                w-12
                h-12
                items-center
                justify-center
                rounded-full
                bg-[#5a311d]
                text-white
            "
            >
                <Heart size={18} className="fill-orange" />
            </div>
            <div>
                <h1 className="font-serif text-5xl text-[#3e1f12]">
                    Favourites
                </h1>
                <p className="mt-1 text-stone-700">
                    Your favourite dishes all in one place.
                </p>
            </div>
        </div>
    </header>
   ) 
}