import { Link } from "react-router-dom";

// we create objects for customer and employee links
const customerLinks = [
    {name: "About us", path: "/about-us"},
    {name: "Our contacts", path: "/contacts"},
    {name: "Our staff", path: "/staff"},
    {name: "Our accomplishments", path: "/accomplishments"}
]

const employeeLinks = [
    {name: "Employee portal", path: "/employee-portal"},
    {name: "Schedules", path: "/schedules"},
    {name: "Training", path: "/training"},
    {name: "Internal News", path: "/news"}
]

export default function QuickLinks() {
    return (
        <section className="mt-16 px-8">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
                {/* Customer links */}
                <div>
                    <h2 className="mb-4 text-3xl font-bold text-white">
                        For customers
                    </h2>
                    <div className="rounded-2xl bg-[#7c4827] p-6 shadow-lg">
                        <ul className="space-y-3">
                            {customerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.path} 
                                        key={link.name} 
                                        className="
                                            group relative inline-block rounded-full
                                            px-2 py-1 font-medium tracking-wide
                                            text-black transition-all duration-300
                                            hover:text-[#7c4827]
                                            hover:bg-orange-100/60
                                        "
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {/* Vertical divider */}
                <div className="hidden md:block h-full w-px bg-white/50" />

                {/* Employee links */}
                <div>
                    <h2 className="mb-4 text-3xl font-bold text-white">
                        For employees only
                    </h2>
                    <div className="rounded-2xl bg-[#7c4827] p-6 shadow-lg">
                        <ul className="space-y-3">
                            {employeeLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        to={link.path} 
                                        className="
                                            hover:text-[#ff7b0a]
                                            group relative inline-block rounded-full px-2
                                            py-2 font-medium tracking-wide text-black
                                            transition-all duration-300 hover:bg-orange-100/60
                                        "
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}