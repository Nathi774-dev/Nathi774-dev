import { useState, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { vehicles } from "../mock_data/vehicles";
import VehicleCard from "../components/vehicles/VehicleCard";

export default function Vehicles() {
    const [showFilters, setShowFilters] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("all");

    const filteredVehicles = useMemo(() => {
        if (selectedStatus === "all") return vehicles;
        return vehicles.filter(vehicle => vehicle.status === selectedStatus)
    }, [selectedStatus]);

    return (
        <div className="-m-6 flex min-h-screen flex-col bg-white sm:-m-8">
            {/* Page heading */}
            <header className="flex items-center justify-between px-6 py-8 sm:px-8">
                <h1 className="text-2xl font-semibold text-black sm:text-3xl">
                    Vehicle Statuses
                </h1>
                <button
                    type="button"
                    onClick={() => setShowFilters(prevFilter => !prevFilter)}
                    className="
                        flex items-center gap-2 rounded-md 
                        bg-[#075b08] px-3 py-2 text-xs 
                        text-white transition hover:bg-green-800"
                >
                    {showFilters ? (
                        <X size={28} />
                    ) : (
                        <SlidersHorizontal size={19} />
                    )}
                    {showFilters ? 'Close' : 'Filter'}
                </button>
            </header>

            {/* Filter section */}
            {showFilters && (
                <div className="mt-5 flex flex-wrap items-center gap-3 rounded-lg bg-gray-100 p-4">
                    <label 
                        htmlFor="vehicle-status"
                        className="text-sm font-medium text-gray-700"
                    >
                        Filter by status:
                    </label>
                    <select 
                        id="vehicle-statuse"
                        value={selectedStatus}
                        onChange={(e) => selectedStatus(e.target.value)}
                        className="
                            rounded-md border border-gray-700 bg-white 
                            px-3 py-2 text-sm text-gray-800 outline-none
                            focus:ring-2 focus:ring-green-500
                        "
                    >
                        <option value="all">All vehicles</option>
                        <option value="active">Active</option>
                        <option value="inacitve">Inactive</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="maintenance">Maintenance</option>
                    </select>
                </div>
            )}

            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {vehicles.length === 0 ? (
                    <p className="mt-10 text-center text-sm text-gray-500">
                        No vehicles were found with this status
                    </p>
                ) : (
                    <VehicleCard vehicles={vehicles} />
                )}
            </section>
        </div>
    )
}