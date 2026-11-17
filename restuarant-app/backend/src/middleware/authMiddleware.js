import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({
                message: "Not authorised. Please log in"
            });
        }

        const token = authHeader.split(" ")[1];        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("_id role");

        if (!user) {
            return res.status(401).json({
                message: "User account no longer exists"
            })
        }

        req.user = {
            id: user._id.toString(),
            role: user.role
        }
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

// this is for the menu's GET request
// this is for admin routes only
export const requireAdmin = async (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin privileges required",
            userRole: req.user?.role
        });
    }

    next();
}