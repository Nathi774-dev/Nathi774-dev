import { ArrowLeftIcon } from "lucide-react";

export default function OnBackButton({ OnBack }) {
    return (
        <button
            type="button"
            onClick={OnBack}
            className="
                flex
                items-center
                gap-2
                text-stone-700
                transition
                duration-300
                hover:text-black
            "
        >
            <ArrowLeftIcon size={20} />
            Back
        </button>
    )
}