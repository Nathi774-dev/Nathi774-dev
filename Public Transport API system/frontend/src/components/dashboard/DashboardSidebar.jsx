import { NavLink, useNavigate } from "react-router-dom";
import {
    CircleUserRound,
    CalendarDays,
    Bus,
    Route,
    AlertTriangle,
    LogOut,
    HomeIcon
} from "lucide-react";

const navigateItems = [
    {
        label: "Scheduled Trips",
        path: "/dashboard/scheduled-trips",
        icon: CalendarDays
    },
    {
        label: "Vehicles",
        path: "/dashboard/vehicles",
        icon: Bus
    },
    {
        label: "Active Trips",
        path: "/dashboard/active-trips",
        icon: Route
    },
    {
        label: "Incidents",
        path: "/dashboard/incidents",
        icon: AlertTriangle
    }
]

export default function DashboardSidebar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("transcore_access_token");
        navigate("/login", { replace: true })
    }

    return (
        <aside className="
            flex min-h-full w-27.5 shrink-0 flex-col
            bg-[#555555] px-2 py-4 text-white sm:w-27.5
            sm:px-3 lg:w-55 lg:px-4
        ">
            {/* Profile */}
            <NavLink 
                to="/dashboard/profile"
                className={({ isActive }) => `
                    mb-8 flex items-start justify-end gap-2 rounded-lg
                    p-2 transition hover:bg-white/10 ${isActive ? "bg-white/10" : ""}
                `}
            >
                <span className="pt-2 text-xs sm:text-sm">My Profile</span>
                <span className="
                    flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                    bg-[#bdbdbd] text-[#222222] transition hover:bg-white
                ">
                    <CircleUserRound size={36} strokeWidth={1.8} />
                </span>
            </NavLink>

            {/* Navigation */}
            <nav className="flex-1" aria-label="Dashboard navigation">
                <ul className="space-y-3">
                    {navigateItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => `
                                        flex items-center gap-2 rounded-lg px-2 py-3
                                        text-sm font-semibold transition sm:gap-3 sm:px-3
                                        ${isActive ? "bg-[#3f3f3f] text-[78c850" : "text-white hover:bg-[#484848]"}
                                    `}
                                >
                                    <Icon size={18} className="shrink-0" />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            {/* Log out section */}
            <button
                type="button"
                onClick={handleLogout}
                className="
                    mt-8 flex w-full items-center justify-center gap-2
                    rounded-md bg-[#3f3f3f] px-3 py-2 text-xs font-medium
                    text-red-500 transition hover:bg-[#292929] hover:text-red-400
                "
            >
                <LogOut size={15} />
                Log Out
            </button>
        </aside>
    )
}