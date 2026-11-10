import { Activity, MapPin } from "lucide-react"

export default function LiveTelemetry({ vehicle }) {
    return (
        <>
            <div className="rounded-xl bg-[#e4f4dc] p-5">
                <Activity className="mb-3 text-green-800" size={28} />
                <h2 className="font-semibold text-gray-800">Live Telemetry</h2>
                <p className="mt-3 text-sm">
                    Current Speed: {vehicle.current_speed ?? "N/A"} 
                </p>
                <p className="text-sm">
                    Last update: {vehicle.last_seen ? new Date(vehicle.last_seen).toLocaleString() : "No update available"}
                </p>
            </div>
            <div className="rounded-xl bg-[#e4f4dc] p-5 sm:col-span-2 xl:col-span-3">
                <MapPin className="mb-3 text-green-800" size={28} />
                <h2 className="font-semibold text-gray-800">
                    Vehicle locations
                </h2>
                <p className="mt-3 text-sm">
                    Latitude: {vehicle.latitude ?? "Unavailable"} 
                </p>
                <p className="mt-3 text-sm">
                    Longitude: {vehicle.longitude ?? "Unavailable"}
                </p>
                {vehicle.longitude != null && vehicle.latitude != null && (
                    <a 
                        href={`https://www.google.com/maps?q=${vehicle.latitude},${vehicle.longitude}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm font-semibold text-green-800 hover:underline"
                    >
                        Open vehicle locations.
                    </a>
                )}
            </div>
        </>
    )
}