import Sidebar from "../components/sidebar/Sidebar";
import ReservationsHeader from "../components/reservations/ReservationsHeader";
import ReservationForm from "../components/reservations/ReservationsForm";
import ShowReservations from "../components/reservations/ShowReservations";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useReservation } from "../context/ReservationContext";

function Reservations() {
    const [showReservations, setShowReservations] = useState(false);
    const { myReservation: reservations } = useReservation();

    return (
        <main className="min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Page content */}
            <section className="px-6 py-10 sm:px-10 lg:px-16">
                {/* Header */}
                <ReservationsHeader />
                <ReservationForm />

                {/* Show reservations button */}
                <div className="mx-auto mt-6 max-w-5xl">
                    <button
                        onClick={() => setShowReservations(current => !current)} 
                        type="button" 
                        className="
                            group flex w-full items-center justify-between rounded-2xl bg-white/90
                            py-5 px-6 text-left shadow-lg transition duration-300 hover:shadow-xl hover:bg-white
                        "
                    >
                        <div>
                            <p className="font-semibold text-[#3e1f12]">
                                {showReservations ? "Hide Rservations" : "Show Reservations"}
                            </p>
                            <p className="mt-1 text-sm text-stone-500">
                                {showReservations ? "Close Your reservations" : "View your upcoming reservations"}
                            </p>
                        </div>

                        <ChevronDown 
                            size={22} 
                            className={
                                `text-[#5a311d] transition-transform duration-300 ${showReservations ? "rotate-180" : "rotate-0"}`
                            }
                        />
                    </button>

                    {/* Collapsing content */}
                    <div 
                        className={
                            `grid transition-all duration-500 ease-in-out ${showReservations ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`
                        }
                    >
                        <div className="overflow-hidden">
                            <ShowReservations />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Reservations;