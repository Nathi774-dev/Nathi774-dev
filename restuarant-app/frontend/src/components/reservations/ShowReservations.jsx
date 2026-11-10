import { CalendarDays, MapPin, Users } from "lucide-react";
import { useReservation } from "../../context/ReservationContext";

export default function ShowReservations() {
    const { myReservation: reservations, locations } = useReservation();

    // for now, we show all reservations
    function getLocations(locationId) {
        const location = locations.find((loc) => {
            return loc.id === locationId
        })
        return location?.name ?? "Uknown location"
    }

    if (reservations.length === 0) {
        return (
            <section className="mx-auto mt-10 max-w-5xl">
                <div className="rounded-3xl bg-white/90 p-8 text-center shadow-xl">
                    <CalendarDays size={42} className="mx-auto text-[#5a311d]" />
                    <h2 className="mt-4 text-2xl font-semibold text-[#3e1f12]">
                        No reservation yet.
                    </h2>
                    <p className="mt-2 text-sm text-stone-500">
                        Your reservations will appear here
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="mx-auto mt-10 max-w-5xl">
            <div className="mb-5">
                <h2 className="font-serif font-medium text-3xl text-[#3e1f12]">
                    Your Reservations
                </h2>
                <p className="mt-1 text-stone-600 text-sm">
                    View your upcoming reservations
                </p>
            </div>
            <div className="grid gap-4">
                {reservations.map((reservation) => (
                    <article
                        key={reservation.id}
                        className="
                            rounded-3xl shadow-lg p-6 bg-white/90 transition duration-300
                            hover:-translate-y-1 hover:shadow-xl
                        "
                    >
                        <div
                            className="flex flex-cl gap-6 sm:flex-row sm:justify-center"
                        >
                            {/* Reservation information */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={19} className="bg-[#5a311d]" />
                                    <h3 className="text-lg text-semibold text-[#3e1f12]">
                                        {getLocations(reservation.locationId)}
                                    </h3>
                                </div>
                            </div>
                            <div className="flex mt-4 flex-wrap gap-x-6 gap-y-3 text-sm text-stone-600">
                                <div className="flex items-center gap-2">
                                    <CalendarDays size={17} />
                                    <span>
                                        {reservation.date}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={12} />
                                    <span>
                                        {reservation.guests}{" "}
                                        {reservation.guests === 1 ? "guest" : "guests"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tables */}
                        <div className="rounded-2xl bg-[#f3eeee] px-5 py-4 text-center">
                            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                                Table
                            </p>
                            <p className="mt-1 text-xl font-semibold text-[#3e1f12]">
                                {reservation.tableId}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}