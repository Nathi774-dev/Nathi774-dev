export default function TelemetryHistory({ history }) {
    return (
        <section className="space-y-5">
            {history.map((record, index) => (
                <article className="rounded-xl bg-[#e0f3d8] p-5" key={record.id ?? index}>
                    <p className="mb-3 text-sm font-semibold text-gray-800">
                        Recorded:{" "}
                        {record.created_at ? new Date(record.created_at).toLocaleString() : "Timestamp unavailable"}
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                        <p>
                            <span className="text-gray-500">Speed</span>
                            <br />
                            <strong>
                                {record.current_speed ?? "N/A"} km/h
                            </strong>
                        </p>
                        <p>
                            <span className="text-gray-500">Passengers</span>
                            <br />
                            <strong>
                                {record.passenger_count ?? "N/A"}
                            </strong>
                        </p>
                        <p>
                            <span className="text-gray-500">Latitude</span>
                            <br />
                            <strong>
                                {record.latitude ?? "N/A"}
                            </strong>
                        </p>
                        <p>
                            <span className="text-gray-500">Longitude</span>
                            <br />
                            <strong>
                                {record.longitude ?? "N/A"}
                            </strong>
                        </p>
                    </div>
                </article>
            ))}
        </section>
    )
}