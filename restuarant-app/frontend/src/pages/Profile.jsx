import { useNavigate, Navigate } from "react-router-dom";
import { UserRound, ShieldCheck, CalendarDays, LogOut, Utensils, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import UserDetailCard from "../components/UserDetailCard";

function Profile() {
    const { user, loading, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    // wait until account is authenticated
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#e98a53]">
                <p className="text-lg font-semibold text-white">
                    Loading your profile...
                </p>
            </div>
        )
    }

    // redirect users who are not logged in
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    const initials = user.name?.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();
    const formattedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-ZA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }) : "Not available"

    async function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <main className="min-h-screen bg-[#e98a53] px-5 py-12">
            <div className="mx-auto max-w-4xl">

                {/* Page heading */}
                <div className="mb-10 text-center">
                    <div className="mb-3 flex justify-center">
                        <Utensils size={35} className="text-white" />
                    </div>

                    <h1 className="text-4xl font-bold text-white">
                        My Profile
                    </h1>
                    <p className="mt-2 text-white/80">
                        Manage your account and personal information
                    </p>
                </div>

                {/* Profile card */}
                <section className="overflow-hidden rounded-3xl bg-[#f8f3ed] shadow-2xl">

                    {/* Profile header */}
                    <div className="bg-[#29211d] px-8 py-10 text-center">
                        <div 
                            className="
                                mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full
                                bg-[#e98a53] text-3xl font-bold text-white shadow-lg
                            "
                        >
                            {initials || <UserRound size={48} />}
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            {user.name}
                        </h2>
                        <p className="mt-1 capitalize text-white/70">
                            {user.role || "Customer"}
                        </p>
                    </div>

                    {/* User details */}
                    <div className="space-y-6 px-6 py-9 sm:px-10">
                        <h3 className="text-xl font-bold text-stone-800">
                            Account information
                        </h3>

                        {/* Name */}
                        <UserDetailCard title="Full Name" detail={user.name} icon={UserRound} />

                        {/* Email */}
                        <UserDetailCard title="Email" detail={user.email} icon={Mail} />

                        {/* Role */}
                        <UserDetailCard title="Account Type" detail={user.role || 'Customer'} icon={ShieldCheck} />

                        {/* Registration date */}
                        <UserDetailCard title="Member since" detail={formattedDate} icon={CalendarDays} />

                        {/* Logout */}
                        <div className="border-t border-stone-200 pt-6">
                            <button 
                                onClick={handleLogout}
                                className="
                                    flex w-full items-center justify-center gap-3 rounded-2xl bg-[#29211d]
                                    px-6 py-4 font-semibold text-white transition hover:bg-red-700
                                "
                            >
                                <LogOut size={20} />
                                Log Out
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Profile;