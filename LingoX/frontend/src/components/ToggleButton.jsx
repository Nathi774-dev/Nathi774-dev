import { EyeOff, Eye } from "lucide-react"

export default function ToggleButton({ buttonProps, toggleValue }) {
    return (
        <button
            {...buttonProps}
        >
            {toggleValue ? <EyeOff size={19} /> : <Eye size={19} />}
        </button>
    )
}