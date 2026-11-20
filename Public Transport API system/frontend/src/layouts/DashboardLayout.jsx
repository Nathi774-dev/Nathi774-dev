import { Outlet } from "react-router-dom";
import AIChatButton from "../components/AI/AIChatButton";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="h-screen w-full overflow-hidden bg-white">
      <div className="flex h-full w-full">

        {/* White inner webpage */}
        <main className="relative min-w-0 flex-1 bg-white p-6 sm:p-8 lg:p-10">
          <Outlet />
          <AIChatButton />
        </main>

        {/* Right sidebar */}
        <DashboardSidebar />
      </div>
    </div>
  );
}