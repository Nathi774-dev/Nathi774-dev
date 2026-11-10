import { Menu, MapPinned } from "lucide-react";
import Locations from "./Locations";

export default function Navbar({ onOpenSidebar, showLocations, showTitle, children }) {
    return (
        <header className="flex items-start justify-between px-8 pt-8">
            <div className="space-y-8">
                <button
                    onClick={onOpenSidebar}
                    className="
                        grid h-12 w-12 place-items-center
                        rounded-full bg-white/15 text-white
                        backdrop-blur-md hover:bg-white/25
                    "
                >
                    <Menu size={28} />
                </button>
                <div>
                    {showTitle && (
                        <h1 className="font-serif text-5xl leading-none text-[#3E1F12]">
                            {children}
                        </h1>
                    )}
                </div>
            </div>
            {/* conditionally show the locations icon */}
            {showLocations && <Locations />}
        </header>
    ) 
}