import { CalendarDays, MapPin, Users, Clock, XCircle } from "lucide-react";
import { useReservation } from "../../context/ReservationContext";

export default function ShowReservations() {
    const {
        myReservation, 
        locations,
        cancelReservation, 
        loadingResponse,
        reservationError
    } = useReservation();

    const reservations = Array.isArray(myReservation) ? myReservation : [];

    // for debugging
    console.log("Reservations state:", myReservation);
    console.log("Is array:", Array.isArray(myReservation));
    
    function getLocations(locationId) {
        const location = locations.find(loc => loc.id === locationId);
        return location?.name ?? "Unknown location";
    }

    // More functions are added because of the backend
    async function handleCancel(id) {
        const confirmed = window.confirm("Are you sure you want to cancel this reservation?");
        if (!confirmed) return;

        try {
            await cancelReservation(id);
            alert("Reservation successfully cancelled.");
        } catch (err) {
            alert(err.message);
        }
    }

    if (loadingResponse) {
        return (
            <section className="mx-auto mt-10 max-w-5xl text-center">
                <p className="text-stone-600">
                    Loading your reservations...
                </p>
            </section>
        )
    }

    if (reservationError && reservations.length === 0) {
        return (
            <section className="mx-auto mt-10 max-w-5xl rounded-3xl bg-white/90 p-8 text-center shadow-xl">
                <p className="text-stone-600">
                    {reservationError}
                </p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 rounded-xl bg-[#5a311d] px-5 py-2 text-white"
                >
                    Try Again
                </button>
            </section>
        )
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
                        key={reservation._id}
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

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-4">
                            <span className={
                                `rounded-full px-3 py-1 text-xs font-medium ${
                                    reservation.status === "confirmed" ?
                                    "bg-green-100 text-green-700" :
                                    "bg-stone-200 text-stone-600"
                                }`
                            }>
                                {reservation.status}
                            </span>

                            {reservation.status === "confirmed" && (
                                <button 
                                    type="button"
                                    onClick={() => handleCancel(reservation._id)}
                                    className="
                                        flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm
                                        font-medium txt-red-600 transition hover:bg-red-50
                                    "
                                >
                                    <XCircle size={17} />
                                    Cancel reservation
                                </button>
                            )}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}