import { Search, X } from "lucide-react";

export default function SearchBar({ search, setSearch }) {
    return (
        <div className="relative flex h-14 w-80 items-center rounded-full bg-white shadow-lg">
            <div
                className="
                    relative flex items-center rounded-full
                    bg-white shadow-lg transition duration-300
                    focus-within:ring-2 focus-within:ring-[#d96d2d]
                    max-w-xl focus-within:shadow-xl w-full ml-auto
                "
            >
                <Search size={28} className="ml-5 text-stone-400" />
                <input
                    type="text"
                    placeholder="Search for a dish"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className="h-14 w-full bg-transparent px-4 text-stone-700 plaeholder:text-stone-900 outline-none"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="mr-4 rounded-full p-1 transition hover:bg-stone-200"
                    >
                        <X size={18} className="text-stone-600" />
                    </button>
                )}
            </div>
        </div>
    )
}