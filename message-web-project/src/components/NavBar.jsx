import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1>The Message Board</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create" style={{
                    backgroundColor: "#634c68",
                    color: "white",
                    borderRadius: "8px"
                }}>New message</Link>
            </div>
        </nav>
    );
}

export default NavBar;