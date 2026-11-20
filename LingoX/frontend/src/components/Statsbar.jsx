export default function Statsbar({
    icon: Icon,
    title,
    value,
    description,
    color
}) {
    return (
        <div className="stats-card">
            <div className="stats-icon" style={{ backgroundColor: color }}>
                <Icon size={24} color="#ffffff" />
            </div>
            <div>
                <p className="stats-title">{title}</p>
                <h2>{value}</h2>
                <span>{description}</span>
            </div>
        </div>
    )
}