import { NavLink } from "react-router-dom";

function NavItem({ to, children }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
            {children}
        </NavLink>
    )
}

export default NavItem;