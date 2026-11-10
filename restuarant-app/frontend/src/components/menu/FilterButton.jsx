import { SlidersHorizontal } from "lucide-react";

export default function FilterButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="
                flex items-center gap-2 rounded-full bg-[#5a311d] px-5 py-3 font-medium
                text-white shadow-lg transition-all duration-300 hover:-translate-y-1
                hover:bg-[#d96d2d] hover:-shadow-xl active:translate-y-0 h-14 hover:text-[#5a311d]
            "
        >
            <SlidersHorizontal size={18} />
            Filter
        </button>
    )
}