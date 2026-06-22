function StatCard({title, value}) {
    return (
        <div className="card stat-card">
            <h3>{title}</h3>
            <div className="stat-value">{value}</div>
        </div>
    )
}

export default StatCard;