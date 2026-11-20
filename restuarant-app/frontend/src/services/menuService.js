const apiURL = import.meta.env.VITE_API_URL;

export const getMenuItems = async () => {
    const response = await fetch(`${apiURL}/api/menu`);
    if (!response.ok) {
        throw new Error("Unable to recieve menu items");
    }

    const data = await response.json();
    return data.menuItems;
}