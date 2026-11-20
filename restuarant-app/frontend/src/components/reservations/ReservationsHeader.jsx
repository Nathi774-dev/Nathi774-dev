
import { CalendarDays } from "lucide-react";
import OnBackButton from "../OnBackButton";
import { useNavigate } from "react-router-dom";

export default function ReservationsHeader() {
    const navigate = useNavigate();

    return (
        <header className="mx-auto max-w-5xl">
            <OnBackButton OnBack={() => {
                if (window.history.length > 1) {
                    navigate(-1);
                } else {
                    navigate("/menu");
                }
            }} />

            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#5a311d] text-white">
                    <CalendarDays size={28} />
                </div>

                <div>
                    <h1 className="font-serif text-3xl font-medium text-[#3e1f12] sm:text-5xl">
                        Make a reservation
                    </h1>

                    <p className="mt-1 text-sm text-stone-700 sm:text-base">
                        Choose a date, time and number of guests
                    </p>
                </div>
            </div>
        </header>
    );
}
