import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeNavbar({ links }) {
    return (
        <nav className="h-18 border-2 border-blue-500 bg-[#3f3f3f] px-4 py-2">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <h1 className="transiai-glow text-3xl bold">
                        TransitCore
                    </h1>
                </div>
                <div className="flex items-center gap-6 text-sm">
                    {links.length > 0 && (
                        links.map((link, index) => (
                            <Link to={link.route} className="text-white transition hover:text-green-400" key={index}>
                                {link.name}
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </nav>
    )
}