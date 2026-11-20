import { Users } from "lucide-react"
import LiveTelemetry from "./LiveTelemetryCard"

export default function DetailCard({ vehicle }) {
    const Icon = vehicle.icon;
    return (
        <article className="rounded-xl bg-[#e0f3d8] p-5 transition hover:shadow-md" key={vehicle.id}>
            <Icon size={28} className="mb-3 text-green-800" />
            <p className="text-sm text-gray-600">
                {vehicle.label}
            </p>
            <p className="mt-1 wrap-break- font-semibold text-gray-900">
                {vehicle.value ?? "Unavailable"}
            </p>
        </article>
    )
}