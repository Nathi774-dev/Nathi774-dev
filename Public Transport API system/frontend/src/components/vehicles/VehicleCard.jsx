import { useNavigate } from "react-router-dom";
import { BusFrontIcon, CarFront, CarTaxiFront, CircleQuestionMarkIcon } from "lucide-react";

export default function VehicleCard({ vehicles = [] }) {
    const navigate = useNavigate();

    return (
        <>
            {vehicles.map((vehicle) => {
                const otherAttributes = () => {
                    if (vehicle.status === "scheduled") {
                        return (
                            <p>
                                Passengers: {vehicle.passenger_count}
                            </p>
                        );
                    }
                    return null;
                };

                const vehicleTypeIcon = () => {
                    switch (vehicle.vehicle_type) {
                        case "quantum":
                            return <CarTaxiFront size={19} strokeWidth={1.5} className="mb-3" />
                        case "bus":
                            return <BusFrontIcon size={19} strokeWidth={1.5} className="mb-3" />
                        case "avanza":
                            return <CarFront size={19} strokeWidth={1.5} className="mb-3" />
                        case "car":
                            return <CarFront size={19} strokeWidth={1.5} className="mb-3" />
                        default:
                            return <CircleQuestionMarkIcon size={19} strokeWidth={1.5} className="mb-3" />
                    }
                }

                return (
                    <article
                        key={vehicle.id}
                        onClick={() => navigate(`/dashboard/vehicles/${vehicle.id}`)}
                        role="link"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                navigate(`/dashboard/vehicles/${vehicle.id}`)
                            }
                        }}
                        className="min-h-32.5 rounded-xl bg-[#bce2aa] p-3 text-sm text-[#183b16] transition hover:shadow-md"
                    >
                            {vehicleTypeIcon(
                                {
                                    size: 21,
                                    strokeWidth: 1.5,
                                    className: "mb-3"
                                }
                            )}
                        <div className="space-y-1 leading-5">
                            <p>
                                Vehicle number: {vehicle.vehicle_number}
                            </p>

                            <p>
                                Capacity: {vehicle.capacity}
                            </p>

                            <p>
                                Vehicle type: {vehicle.vehicle_type}
                            </p>

                            <p>
                                Status: {vehicle.status}
                            </p>

                            {otherAttributes()}
                        </div>
                    </article>
                );
            })}
        </>
    );
}
