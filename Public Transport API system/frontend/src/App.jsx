import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import DashboardLayout from "./layouts/DashboardLayout";
import Incidents from "./pages/Incidents";
import ScheduledTrips from "./pages/Trips";
import Vehicles from "./pages/VehicleStatuses";
import ActiveTrips from "./pages/ActiveTrips";
import DashboardHome from "./pages/Dashboard";
import VehicleDetails from "./pages/VehicleDetails";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="incidents" element={<Incidents />} />
                <Route path="scheduled-trips" element={<ScheduledTrips />} />
                <Route path="vehicles" element={<Vehicles />} />
                <Route path="active-trips" element={<ActiveTrips />} />
                <Route path="" element={<DashboardHome />} />
                <Route path="scheduled-trips" element={<ScheduledTrips />} />
                <Route path="vehicles/:vehicleId" element={<VehicleDetails />} />
            </Route>
        </Routes>
    )
}

export default App;