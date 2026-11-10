import { CalendarDays, LogOut } from "lucide-react";

export default function FloatingActions() {
    const cssClasses = "flex items-center gap-2 rounded-full bg-[#FADC57] px-5 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    return (
        <div className="sticky bottom-6 right-6 z-50 flex gap-3">
            <button
                className={cssClasses}
            >
                <CalendarDays size={18} />
                Events
            </button>
            <button
                className={cssClasses}
            >
                <LogOut size={18} />
                Log Out
            </button>
        </div>
    )
}