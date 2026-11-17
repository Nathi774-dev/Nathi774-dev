import MenuItem from "../models/menu.js";

// POST to /api/menu
export const createMenuItem = async (req, res) => {
    try {
        const items = Array.isArray(req.body) ? req.body : [req.body]
        if (items.length === 0) {
            return res.status(400).json({
                message: 'Please provide at least 1 item'
            })
        }

        // insert many menu items
        const menuItems = await MenuItem.insertMany(items)
        return res.status(201).json({
            message: "Many items have been successfully added",
            success: true,
            count: menuItems.length,
            menuItems
        })
    } catch (error) {
        console.error("Create menu item error: ", error);
        if (error.name === "ValidationError" || error.name === "BulkWriteError") {
            return res.status(400).json({
                message: error.message
            })
        }

        return res.status(500).json({
            message: "Unable to add new items to the menu"
        })
    }
}

// GET request to display all menu items
// on the frontend
export const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find().sort({ createdAt: -1 });
        return res.status(200).json({
            count: menuItems.length,
            menuItems
        });
    } catch (error) {
        console.error("Menu items error on GET request: ", error);
        return res.status(500).json({
            message: "Unable to retrieve menu items"
        })
    }
}