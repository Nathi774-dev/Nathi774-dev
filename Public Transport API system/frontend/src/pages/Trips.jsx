import { X, WandSparkles, CalendarDays } from "lucide-react";
import { trips } from "../mock_data/trips";
import { getLocalDate } from "../mock_data/date";
import { useState } from "react";
import ManualScheduling from "../components/forms/ManualSchedulingForm";

function ScheduledTrips() {
    const [showManualForm, setShowManualForm] = useState(false);
    const [scheduleDate, showSetScheduleDate] = useState({
        date: getLocalDate(),
        time: ""
    })
    const [message, setMessage] = useState("")

    function handleChange(e) {
        const { name, value } = e.target
        showSetScheduleDate((prevDate) => ({
            ...prevDate,
            [name]: value
        }))
    }

    function handleManualSchedule(e) {
        e.preventDefault()
        const scheduleDateTime = new Date(`${scheduleDate.date}T${scheduleDate.time}`);
        if (scheduleDateTime <= new Date()) {
            setMessage("Please select a future date and time");
            return;
        }
        console.log(`Manual schedule date: ${scheduleDateTime}`);
        setMessage(`Successfull departure: ${scheduleDateTime.date} at ${scheduleDateTime.time}`);
        setShowManualForm(false);
    }

    function handleAutoScheduling() {
        setMessage("Auto scheduling will be set in the backend")
    }

    return (
        <div className="-m-6 flex min-h-[calc(100vh-100px)] flex-col bg-[#e0f3d8] sm:-m-8 lg:-m-10">
            <header className="bg-white px-6 py-8 sm:px-10">
                <h1 className="text-2xl font-bold text-black sm:text-3xl">
                    All scheduled trips
                </h1>
            </header>

            {/* Trips content */}
            <div className="space-y-6 px-5 py-5">
                {trips.map((trip) => (
                    <article key={trip.id} className="w-full max-w-70 rounded-xl bg-[#78c850] px-2 py-1 text-sm leading- text-black">
                        <p>Vehicles: {trip.vehicle}</p>
                        <p>
                            Scheduled time to start:{" "} <span className="ml-2">{trip.startTime}</span> 
                        </p>
                        {trip.timeLeft && (
                            <p>
                                Time left:{" "} <span className="text-red-500">{trip.timeLeft}</span>
                            </p>
                        )}
                        <p>
                            Seating:{" "}
                            <span className={trip.seatingStatus === "normal" ? 'text-black' : 'text-red-500'}>
                                {trip.seating}
                            </span>
                        </p>
                        {trip.overdueTime}
                    </article>
                ))}
            </div>

            {/* Two other buttons for auto and manual scheduling */}
            <div className="flex items-center justify-center gap-4">
                <button
                    type="button"
                    onClick={handleAutoScheduling}
                    className="
                        flex w-48 items-center justify-center 
                        gap-2 rounded-lg bg-[#555555] px-4 py-3
                        text-sm font-medium text-white transition
                        hover:bg-[#3f3f3f]
                    "
                >
                    <WandSparkles size={28} />
                    Auto Schedule
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setMessage("");
                        setShowManualForm(true);
                    }}
                    className="
                        flex w-48 items-center justify-center gap-2 rounded-lg bg-[#555555]
                        px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3f3f3f]
                    "
                >
                    <CalendarDays size={28} />
                    Manual Scheduling
                </button>

                {message && (
                    <p className="max-w-xs text-center text-sm text-gray-700 gap-4
                    ">
                        {message}
                    </p>
                )}

                {showManualForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-[#78c850]">
                                    Manual Scheduling
                                </h2>
                                <button 
                                    type="button"
                                    onClick={() => setShowManualForm(false)}
                                    aria-label="Close scheduling form"
                                    className="text-gray-500 hover:text-black"
                                >
                                    <X size={22} />
                                </button>
                            </div>
                            <ManualScheduling onSubmit={handleManualSchedule} data={trips} onChange={handleChange} />
                        </div>
                    </div>
                )}
            </div>
        </div>    
    )

}

export default ScheduledTrips;