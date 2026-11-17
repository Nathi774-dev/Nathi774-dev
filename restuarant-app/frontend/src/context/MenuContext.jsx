import { createContext, useContext, useEffect, useState } from "react";
import { getMenuItems } from "../services/menuService";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMenuItems = async () => {
        try {
            setLoading(true);
            setError(null);

            const items = await getMenuItems();
            setMenuItems(items);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMenuItems();
    }, []);

    return <MenuContext.Provider value={{ menuItems, loading, error, refreshMenu: fetchMenuItems }}>
        {children}
    </MenuContext.Provider>
}

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("useMenu must be inside the menu context provider");
    }
    return context;
}