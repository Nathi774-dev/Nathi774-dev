import { Link } from "react-router-dom"

export default function EmptyState({ icon: Icon, title, message }) {
    return (
        <div className="
            flex min-h-52 flex-col items-center 
            justify-center border-2 rounded-xl 
            border-dashed border-gray-300 bg-gray-50
            px-6 py-10 text-center
        "
        >
            <Icon size={38} className="mb-3 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-700">
                {title}
            </h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">
                {message}
            </p>
            <Link 
                to="/dashboard/vehicles" 
                className="mt-5 rounded-lg bg-[#78c850] px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
            >
                Back to vehicles
            </Link>
        </div>
    )
}