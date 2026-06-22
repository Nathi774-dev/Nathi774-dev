import NavBar from "./Dashboard/NavBar";
import SideBar from "./Dashboard/SideBar";

function Layout({children}) {
    return (
        <div className="app-shell">
            <SideBar />
            <div className="app-main">
                <NavBar />
                {children}
            </div>
        </div>
    )
}

export default Layout;