import Navigation from "./Navigation/Navigation";
import { useAuth } from "../context/AuthContext";

function Layout({children}) {
    const { logout } = useAuth();

    return (
        <div className="app-shell">
            <Navigation onLogout={logout} />
            <div className="app-main">
                {children}
            </div>
        </div>
    )
}

export default Layout;