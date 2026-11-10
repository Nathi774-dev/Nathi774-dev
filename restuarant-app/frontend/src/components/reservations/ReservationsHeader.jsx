import { CalendarDays } from "lucide-react";

export default function ReservationsHeader() {
    return (
        <header className="mx-auto max-w-5xl">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5a311d] text-white">
                    <CalendarDays size={28} />
                </div>
                <div>
                    <h1 className="font-serif text-4xl font-medium text-[#3e1f12] sm:text-5xl">
                        Make a reservation
                    </h1>
                    <p className="mt-1 text-stone-700">
                        Choose a date, time and number of guests
                    </p>
                </div>
            </div>
        </header>
    )
}