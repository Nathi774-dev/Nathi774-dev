import {
    Settings as SettingsIcon,
    UserRound,
    UtensilsCrossed,
    Package,
    ClipboardList
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Settings() {
    const { user } = useAuth();
    const isAdmin = ['admin', 'restuarant_owner'].includes(user?.role?.toLowerCase());
    const adminSettings = [
        {
            title: "Menu Management",
            description: "Add new items and update existing items.",
            icon: UtensilsCrossed
        },
        {
            title: "Stock Management",
            description: "Update the quantity of an item that is available.",
            icon: Package
        },
        {
            title: "Inventory Mangement",
            description: "View and manage your restuarant inventory.",
            icon: ClipboardList
        }
    ];

    return (
        <main className="min-h-screen bg-[#f8eee5] px-6 py-10">
            <div className="mx-auto max-w-5xl">
                <div className="mb-10">
                    <div className="flex items-center gap-3">
                        <SettingsIcon size={30} className="text-[#5a311d]" />
                        <h1 className="text-3xl font-bold text-[#5a311d]">
                            Settings
                        </h1>
                    </div>

                    <p className="mt-2 text-stone-600">
                        Manage your account and restuarant preferences.
                    </p>
                </div>

                {/* General settings */}
                <section className="mb-10">
                    <h2 className="mb-4 text-xl font-bold text-stone-800">
                        General settings
                    </h2>
                    <div className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-orange-100 p-3">
                                <UserRound className="text-[#5a311d]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-stone-900">
                                    Account settings
                                </h3>
                                <p className="text-sm text-stone-900">
                                    Manage your personal preferences.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Admin settings */}
                {isAdmin && (
                    <section>
                        <h2 className="mb-4 text-lg font-semibold text-stone-800">
                            Restuarant Management
                        </h2>
                        <div className="grid gap-5 md:grid-cols-2">
                            {adminSettings.map(({ title, description, icon: Icon }) => (
                                <button 
                                    key={title}
                                    type="button"
                                    className="
                                        flex items-start gap-4 rounded-2xl bg-white p-6 text-left
                                        shadow-sm transition hover:-translate-y-1 hover:shadow-lg
                                    "
                                >
                                    <div className="rounded-xl bg-orange-100 p-3">
                                        <Icon className="text-[#5a311d]" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-stone-900">
                                            {title}
                                        </h3>
                                        <p className="mt-1 text-sm text-stone-500">
                                            {description}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    )
}