import { Link } from "react-router-dom";
import {
    House,
    UtensilsCrossed,
    CalendarDays,
    Heart,
    UserRound,
    Settings,
    X
} from "lucide-react";
import Footer from "../Footer";

// to prevent any re-renders of the following objects needed for navigations
// that is why it is outside the function

const navigation = [
    {
        name: "Home",
        icon: House,
        path: "/"
    },
    {
        name: "Menu",
        icon: UtensilsCrossed,
        path: "/menu",
    },
    {
        name: "Reservations",
        icon: CalendarDays,
        path: "/reservations"
    },
    {
        name: "My Favourites",
        icon: Heart,
        path: "/favourites"
    },
    {
        name: "My profile",
        icon: UserRound,
        path: "/profile"
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings"
    }
]

export default function Sidebar({ open, onClose }) {
    return (
        <>
            {/* Dark overlay */}
            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500
                    ${open ? "opacity-100" : "pointer-events-none opacity-0"}
                `}
            />

            {/* The actual sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50
                    flex h-screen w-72 flex-col bg-[#5B2F18]
                    text-white shadow-[10px_0_35px_rgba(0,0,0,0.35)] 
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${open ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-6">
                    <div className={
                        `transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`
                    }>
                        <h2 className="font-serif text-3xl">
                            <span className="text-red-600">Fen</span>zot<span className="text-green-600">ti</span>
                        </h2>
                        <p className="text-sm text-orange-300">
                            Foods Co.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                        rounded-xl p-2 transition-all
                        duration-300
                        hover:rotate-90
                        hover:bg-white/10
                        "
                    >
                        <X />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-8 flex flex-col gap-4 px-4">
                    {navigation.map(({ name, icon: Icon, path }, index) => (
                        <Link 
                            key={name} 
                            to={path} 
                            style={{
                                transitionDelay: open ? `${index * 70}ms` : "0ms"
                            }}
                            className={`
                                flex items-center gap-4
                                rounded-xl px-4 py-3 transition
                                hover:bg-orange-500/20 hover:translate-x-2
                                ${open ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}

                            `}
                        >
                            <Icon size={22} /> {name}
                        </Link>
                    ))}
                </nav>
                <Footer open={open} />
            </aside>
        </>
    )
}