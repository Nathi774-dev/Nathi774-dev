const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: false,
                message: "Authentication required"
            });
        }

        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const user = await User.findOne(decoded.id)
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User is not found"
            })
        }

        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: "Token is invalid or expired"
        })
    }
}

module.exports = { protect }