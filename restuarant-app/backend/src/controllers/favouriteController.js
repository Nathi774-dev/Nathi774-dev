import Favourite from "../models/favourites.js";
import MenuItem from "../models/menu.js";

// GET for /api/favourites
export const getFavourites = async (req, res) => {
    try {
        const favourites = await Favourite.find({
            user: req.user.id
        }).populate("menuItem")

        const menuItems = favourites.filter(item => item.menuItem).map(item => item.menuItem)

        return res.status(200).json({
            count: menuItems.length,
            favourites: menuItems
        })
    } catch (err) {
        console.error("GET favourites error: ", err)
        return res.status(500).json({
            message: 'Unable to retrieve favourites'
        })
    }
}

// POST for /api/favourites/:menuItemId
export const addFavourite = async (req, res) => {
    try {
        const { menuItemId } = req.params
        const menuItem = await MenuItem.findById(menuItemId)
        if (!menuItem) {
            return res.status(404).json({
                message: "Menu item not found"
            })
        }

        const existingFavourite = await Favourite.findOne({
            user: req.user.id,
            menuItem: menuItemId
        })

        if (existingFavourite) {
            return res.status(200).json({
                message: "Item is already is already in favourites"
            })
        }

        const favourite = await Favourite.create({
            user: req.user.id,
            menuItem: menuItemId
        })

        return res.status(201).json({
            message: "Added to favourites",
            favourite
        })
    } catch (err) {
        console.error("Add Favourites error: ", err)
        if (err.code === 11000) {
            return res.status(200).json({
                message: "Item is already in your favourites"
            })
        }

        return res.status(500).json({
            message: 'Unable to add favourite'
        })
    }
}

// DELETE method for a favourite (/api/favourites/:menuItemId)
export const removeFavourite = async (req, res) => {
    try {
        const { menuItemId } = req.params
        const favourite = await Favourite.findOneAndDelete({
            user: req.user.id,
            menuItem: menuItemId
        })

        if (!favourite) {
            return res.status(404).json({
                message: 'Favourite not found'
            })
        }

        return res.status(200).json({
            message: 'Removed from favourites'
        })
    } catch (err) {
        console.error("Remove favourite error: ", err)
        return res.status(500).json({
            message: 'Unable to remove favourite'
        })
    }
}