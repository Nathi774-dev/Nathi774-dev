import mongoose from "mongoose";
import Order from "../models/orders.js";
import MenuItem from "../models/menu.js";

// for the POST request for /api/orders
export const createOrder = async (req, res) => {
    try {
        const { items } = req.body || {};
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Your order must contain at least one item"
            })
        }

        // validate item IDs and quantities
        for (const item of items) {
            if (
                !item.menuItemId ||
                mongoose.isValidObjectId(item.menuItemId) || 
                !Number.isInteger(item.quantity) || 
                item.quantity < 1
            ) {
                return res.status(400).json({
                    message: "Each item must have a valid ID and positive whole number quantity"
                })
            }
        }

        // combine duplicate menu item IDs
        const quantities = new Map();
        for (const item of items) {
            const id = item.menuItemId.toString();
            quantities.set(id, (quantities.get(id) || 0) + item.quantity);
        }
        const menuItemIds = [...quantities.key()];

        // retrieve the real menu items from MongoDB
        const menuItems = await MenuItem.find({
            _id: { $in: menuItemIds }
        })

        if (menuItems.length !== menuItemIds.length) {
            return res.status(400).json({
                message: "One or more menu items could not be found"
            })
        }

        const orderItems = [];

        for (const menuItem of menuItems) {
            const quantity = quantities.get(menuItem._id.toString());
            if (menuItem.stock < quantity) {
                return re.status(400).json({
                    message: `Not enough stock for ${menuItem.name}`
                })
            }

            orderItems.push({
                menuItem: menuItem._id,
                name: menuItem.name,
                price: menuItem.price,
                quantity
            });
        }

        // calculate prices using database values, never client prices
        const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const total = Number(subtotal.toFixed(2));
        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            subtotal: total,
            total,
            status: "pending",
            paymentStatus: "pending",
            paymentProvider: "payfast"
        });

        return res.status(201).json({
            message: "Order successfully created",
            order
        });
    } catch (error) {
        console.error("An order error has occured: ", error);
        return res.status(500).json({
            message: "Unable to create your order"
        });
    }
}

// for the GET request for /api/my-orders
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            count: orders.length,
            orders
        })
    } catch (error) {
        console.error("Get orders error: ", error);
        return res.status(500).json({
            message: "Unable to retrieve your orders"
        });
    }
}