
import { Link } from "react-router-dom";
import { MapPin, Navigation } from "lucide-react";
import gpsMap from "../../assets/navigation.gif";

export default function MapPreview() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-8">
      {/* Animated GPS map */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow */}
        <div className="absolute h-64 w-64 rounded-full bg-green-300/40 blur-2xl animate-pulse" />

        {/* Circular map */}
        <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white/80 shadow-2xl ring-4 ring-green-300/50 sm:h-64 sm:w-64">
          <img
            src={gpsMap}
            alt="Animated GPS map showing vehicle navigation"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Vehicle locations link */}
      <Link
        to="/dashboard/telemetry"
        className="group flex items-center gap-3 rounded-xl border-2 border-white/70 bg-white px-6 py-4 font-semibold text-green-800 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-green-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50"
      >
        <MapPin
          size={26}
          className="transition-transform duration-300 group-hover:scale-110"
        />

        <span className="text-left leading-snug">
          Check vehicle locations
        </span>
      </Link>
    </div>
  );
}
