import { Star } from "lucide-react";
import { useEffect } from "react";

export default function ReviewCard({name, review, rating}) {
    return (
        <article
            className="
                min-w-[280px] rounded-3xl bg-[#ece8e8] p-6 shadow-lg
                transition-all duration-300 hover:-translate-y-2
                hover:shadow-2xl
            "
        >
            <div className="mb-4 flex">
                {Array.from({length: rating}).map((_, index) => (
                    <Star key={index} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
            </div>
            <p className="text-sm leading-6 text-stone-700">
                "{review}"
            </p>
            <h3 className="mt-6 font-semibold">
                - {name}
            </h3>
        </article>
    )
}