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
                <NavItem to="/interviews">Interviews</NavItem>
                <NavItem to="/calendar">Calendar</NavItem>
                <NavItem to="/documents">Uploading Resumes</NavItem>
            </nav>

            <button className="logout-btn" onClick={logout}>Logout</button>
        </aside>
    )
}

export default SideBar;