import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    BusFront,
    MapPin,
    Gauge,
    Users,
    Wrench,
    Activity,
    CarFront,
    CarTaxiFront,
    CircleQuestionMarkIcon,
    Clock,
    Database
} from "lucide-react"
import { vehiclesApi } from "../api/api";
import DetailCard from "../components/vehicles/VehicleDetailCard";
import EmptyState from "../components/vehicles/EmptyState";
import TelemetryHistory from "../components/vehicles/VehicleHistoryCard";
import { Link } from "react-router-dom";

export default function VehicleDetails() {
    const navigate = useNavigate();
    const { vehicleId } = useParams();
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState([]);
    const [historyError, setHistoryError] = useState("");
    const [error, setError] = useState("");
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function loadVehicle() {
            setLoading(true);
            setError("");
            try {
                const data = await vehiclesApi.getVehicleById(vehicleId);
                if (!cancelled) {
                    setVehicle(data);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(
                        err.response?.data?.detail || "Unable to load vehicle information"
                    )
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        async function loadVehicleHistory() {
            setHistoryLoading(true);
            setHistoryError("");
            try {
                const data = await vehiclesApi.getTelemetryHistory(vehicleId);
                if (!cancelled) {
                    setHistory(Array.isArray(data) ? data : [])
                }
            } catch (err) {
                if (!cancelled) {
                    setHistoryError(err.response?.data?.detail || "Unable to load vehicle history.");
                }
            } finally {
                if (!cancelled) setHistoryLoading(false);
            }
        }
        loadVehicle();
        loadVehicleHistory();

        return () => {
            cancelled = true;
        }
    }, [vehicleId])

    if (loading) {
        return (
            <div className="flex min-h-64 items-center justify-content">
                <p className="p-6 text-gray-600">Loading vehicle details...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-6">
                <p className="text-red-600">
                    <Link to="/dashboard/vehicles" className="mt-4 inline-block text-green-700">
                        Back to vehicles
                    </Link>
                </p>
            </div>
        )
    }

    if (!vehicle) {
        return (
            <div className="p-6">
                <button 
                    onClick={() => navigate("/dashboard/vehicles")}
                    className="mb-6 flex items-center gap-2 text-sm text-green-700"
                >
                    <ArrowLeft size={18} />
                    Back to vehicles
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                    Vehicle details unavailable
                </h1>
                <p className="text-gray-500 mt-2">
                    Vehicle ID: {vehicleId}, will need its information to be retrieved from the backend.
                </p>
            </div>
        )
    }

    function vehicleType() {
        switch (vehicle.vehicle_type) {
            case "bus":
                return <BusFront size={30} />
            case "car":
                return <CarFront size={30} />
            case "avanza":
                return <CarFront size={30} />
            case "quantum":
                return <CarTaxiFront size={30} />
            default:
                return <CircleQuestionMarkIcon size={30} />
        }
    }

    const details = [
        {
            label: "Vehicle number",
            value: vehicle.vehicle_number,
            icon: BusFront,
        },
        {
            label: "Vehicle type",
            value: vehicle.vehicle_type,
            icon: BusFront,
        },
        {
            label: "Passenger capacity",
            value: `${vehicle.passenger_count} / ${vehicle.capacity}`,
            icon: Users,
        },
        {
            label: "Current speed",
            value: vehicle.current_speed != null ? `${vehicle.current_speed} km/h` : "Unavailable",
            icon: Gauge,
        },
        {
            label: "GPS coordinates",
            value: `${vehicle.latitude ?? "N/A"}, ${vehicle.longitude ?? "N/A"}`,
            icon: MapPin,
        },
        {
            label: "Vehicle status",
            value: vehicle.status,
            icon: Activity,
        },
        {
            label: "Last seen",
            value: vehicle.last_seen ? new Date(vehicle.last_seen).toLocaleString() : "No recent update",
            icon: Clock
        }
    ];

    const passengerPercentage = vehicle.capacity ? Math.min(
        (vehicle.passenger_count / vehicle.capacity) * 100, 100) : 0;

    return (
        <div className="min-h-full bg-white">
            <Link 
                to="/dashboard/vehicles"
                className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hpver:text-green-600"
            >
                <ArrowLeft size={28} />
                Back to vehicles
            </Link>

            {/* Vehicles heading */}
            <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Vehicle: {vehicle.vehicle_number}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Vehicle ID: {vehicle.id}
                    </p>
                </div>
                <span className="rounded-full bg-[#e0f3d8] px-4 py-2 text-sm font-semibold text-green-800">
                    {vehicle.status}
                </span>
            </header>

            {/* Vehicle information starts */}
            <section>
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                    {details.map((detail) => (
                        <DetailCard vehicle={detail} />
                    ))}

                    {/* Telemetry history */}
                    <section className="mt-10">
                        <div className="mb-4 flex items-center gap-2">
                            <Activity className="text-green-700" />
                            <h2 className="text-xl font-bold text-gray-900">
                                Telemetry history
                            </h2>
                        </div>

                        {historyLoading ? (
                            <EmptyState icon={<Database />} title="Loading telemetry" message={historyError}/>
                        ) : (
                            <TelemetryHistory history={history} />
                        )}
                    </section>
                </h2>
            </section>
        </div>
    )
}