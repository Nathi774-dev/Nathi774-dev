import { useReservation } from "../../context/ReservationContext";

export default function ReservationForm() {
    const {
        reservation,
        locations,
        selectedLocation,
        availableTables,
        updateReservation,
        selectTable,
        createReservation,
        myReservation
    } = useReservation();

    const reservations = myReservation

    console.log("Reservation:", reservation);
    console.log("Selected location:", selectedLocation);
    console.log("Available tables:", availableTables);

    function handleSubmit(e) {
        e.preventDefault();

        console.log("Reservation submitted:", reservation);
        console.log("Selected location:", selectedLocation);
        console.log("Selected table:", reservation.tableId);

        const success = createReservation();
        if (!success) {
            return;
        }

        alert("Reservation complete")
    }

    function handleChange(e) {
        const { name, value } = e.target;

        updateReservation(name, value);
    }

    return (
        <section className="mx-auto mt-10 max-w-5xl">

            <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white/90 p-6 shadow-xl sm:p-8"
            >

                {/* HEADER */}

                <h2 className="text-2xl font-semibold text-[#3e1f12]">
                    Reservation Details
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                    Tell us when you'd like to visit
                </p>


                {/* FORM FIELDS */}

                <div className="mt-8 grid gap-6 sm:grid-cols-2">

                    {/* DATE */}

                    <div>
                        <label
                            htmlFor="date"
                            className="mb-2 block text-sm font-medium text-stone-700"
                        >
                            Date
                        </label>

                        <input
                            id="date"
                            name="date"
                            type="date"
                            value={reservation.date}
                            onChange={handleChange}
                            className="
                                h-14
                                w-full
                                rounded-2xl
                                border-2
                                border-transparent
                                bg-[#ece8e8]
                                px-5
                                text-stone-800
                                outline-none
                                transition
                                focus:border-[#5a311d]
                                focus:bg-white
                            "
                        />
                    </div>


                    {/* TIME */}

                    <div>
                        <label
                            htmlFor="time"
                            className="mb-2 block text-sm font-medium text-stone-700"
                        >
                            Time
                        </label>

                        <input
                            id="time"
                            name="time"
                            type="time"
                            value={reservation.time}
                            onChange={handleChange}
                            className="
                                h-14
                                w-full
                                rounded-2xl
                                border-2
                                border-transparent
                                bg-[#ece8e8]
                                px-5
                                text-stone-800
                                outline-none
                                transition
                                focus:border-[#5a311d]
                                focus:bg-white
                            "
                        />
                    </div>


                    {/* GUESTS */}

                    <div>
                        <label
                            htmlFor="guests"
                            className="mb-2 block text-sm font-medium text-stone-700"
                        >
                            Number of Guests
                        </label>

                        <select
                            id="guests"
                            name="guests"
                            value={reservation.guests}
                            onChange={handleChange}
                            className="
                                h-14
                                w-full
                                rounded-2xl
                                border-2
                                border-transparent
                                bg-[#ece8e8]
                                px-5
                                text-stone-800
                                outline-none
                                transition
                                focus:border-[#5a311d]
                                focus:bg-white
                            "
                        >
                            {Array.from(
                                { length: 12 },
                                (_, index) => index + 1
                            ).map((number) => (
                                <option
                                    key={number}
                                    value={number}
                                >
                                    {number}{" "}
                                    {number === 1
                                        ? "guest"
                                        : "guests"}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* LOCATION */}

                    <div>
                        <label
                            htmlFor="locationId"
                            className="mb-2 block text-sm font-medium text-stone-700"
                        >
                            Location
                        </label>

                        <select
                            id="locationId"
                            name="locationId"
                            value={reservation.locationId}
                            onChange={handleChange}
                            className="
                                h-14
                                w-full
                                rounded-2xl
                                border-2
                                border-transparent
                                bg-[#ece8e8]
                                px-5
                                text-stone-800
                                outline-none
                                transition
                                focus:border-[#5a311d]
                                focus:bg-white
                            "
                        >
                            <option value="">
                                Select a location
                            </option>

                            {locations.map((location) => (
                                <option
                                    key={location.id}
                                    value={location.id}
                                >
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>


                {/* AVAILABLE TABLES */}

                {reservation.locationId &&
                    reservation.date &&
                    reservation.time && (

                        <div className="mt-10">

                            <h3 className="text-xl font-semibold text-[#3e1f12]">
                                Available tables
                            </h3>

                            <p className="mt-1 text-sm text-stone-500">
                                Tables suitable for{" "}
                                {reservation.guests}{" "}
                                {reservation.guests === 1
                                    ? "guest"
                                    : "guests"}.
                            </p>


                            {/* NO TABLES */}

                            {availableTables.length === 0 ? (

                                <div className="
                                    mt-5
                                    rounded-2xl
                                    bg-red-50
                                    p-5
                                    text-center
                                    text-red-500
                                ">
                                    No tables are available for
                                    this time and date.
                                </div>

                            ) : (

                                /* TABLES */

                                <div className="
                                    mt-5
                                    grid
                                    gap-4
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                ">

                                    {availableTables.map((table) => {

                                        const selected =
                                            reservation.tableId ===
                                            table.id;

                                        return (
                                            <button
                                                key={table.id}
                                                type="button"
                                                onClick={() =>
                                                    selectTable(table.id)
                                                }
                                                className={`
                                                    rounded-2xl
                                                    border-2
                                                    p-5
                                                    text-left
                                                    transition-all
                                                    duration-300

                                                    ${
                                                        selected
                                                            ? "border-[#5a311d] bg-[#5a311d] text-white shadow-lg"
                                                            : "border-stone-200 bg-stone-50 hover:-translate-y-1 hover:border-[#d96d2d] hover:bg-white"
                                                    }
                                                `}
                                            >

                                                <p className="font-semibold">
                                                    Table {table.id}
                                                </p>

                                                <p
                                                    className={`
                                                        mt-1 text-sm
                                                        ${
                                                            selected
                                                                ? "text-white/70"
                                                                : "text-stone-500"
                                                        }
                                                    `}
                                                >
                                                    {table.seats} seats
                                                </p>

                                                <p
                                                    className={`
                                                        mt-3 text-xs font-medium
                                                        ${
                                                            selected
                                                                ? "text-white"
                                                                : "text-green-700"
                                                        }
                                                    `}
                                                >
                                                    {selected
                                                        ? "Selected"
                                                        : "Available"}
                                                </p>

                                            </button>
                                        );
                                    })}

                                </div>
                            )}

                        </div>
                    )}


                {/* CONFIRM */}

                <button
                    type="submit"
                    disabled={!reservation.tableId}
                    className="
                        mt-8
                        h-14
                        w-full
                        rounded-2xl
                        bg-black
                        font-semibold
                        text-white
                        shadow-lg
                        transition
                        duration-300
                        hover:-translate-y-1
                        hover:bg-stone-900
                        hover:shadow-xl
                        active:translate-y-0
                        disabled:cursor-not-allowed
                        disabled:bg-stone-300
                        disabled:text-stone-500
                        disabled:shadow-none
                    "
                >
                    Confirm reservation
                </button>

            </form>

        </section>
    );
}