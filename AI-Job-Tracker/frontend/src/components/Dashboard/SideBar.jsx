import NavItem from "../NavItem";
import Logo from "../Logo";
import { useAuth } from "../../context/AuthContext";

function SideBar() {
    const {logout} = useAuth();

    return (
        <aside className="sidebar">
            <Logo />

            <nav className="sidebar-nav">
                <NavItem to="/">Dashboard</NavItem>
                <NavItem to="/applications">Applications</NavItem>
            </nav>

            <button className="logout-btn" onClick={logout}>Logout</button>
        </aside>
    )
}

export default SideBar;