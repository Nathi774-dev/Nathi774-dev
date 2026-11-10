import { MapPinned } from "lucide-react"

export default function Locations() {
    return (
        <button
                className="
                    flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-lg
                    transition hover:scale-105
                "
        >
            <MapPinned size={19} />
            <span className="font-medium">All locations</span>
        </button>
    )
}