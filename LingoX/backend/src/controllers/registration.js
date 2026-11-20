const User = require("../models/user")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // 1. Validate fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide username, email or password"
            })
        }

        // 2. Validate each input field to see if it's typed in correctly
        const cleanUsername = name.trim()
        if (cleanUsername.length < 3 || cleanUsername > 25) {
            return res.status(400).json({
                success: false,
                message: "Username must be between 3 and 25 characters long"
            })
        }

        const cleanEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            return res.status(400).json({
                success: true,
                message: "Please provide a valid email address"
            })
        }

        if (password.length < 8) {
            return res.status(400),json({
                success: false,
                message: "Password must at least contain 8 characters"
            })
        }

        // 3. check for an existing user
        const existingUser = await User.findOne({
            $or: [
                { email: cleanEmail },
                { username: cleanUsername }
            ]
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        // 4. if the user does not exist, create a new user account
        const user = await User.create({
            username: cleanUsername,
            email: cleanEmail,
            password   // automatically hashed by the model
        })

        // 5. Return safe user information
        return res.status(201).json({
            success: true,
            message: "User successfully created",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                xp: user.xp,
                streak: user.streak,
                completedLessons: user.completedLessons
            }
        })
    } catch (error) {
        // 6. Handle duplicate database index errors too
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "That username or email is already registered"
            })
        }

        console.error("Registration error: ", error)

        return res.status(500).json({
            success: false,
            message: "Something went wrong during registration"
        })
    }
}

// loggin in user details
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter your passsword and email"
            })
        }

        const cleanEmail = email.trim().toLowerCase()

        // password is included in the user schema for comparison
        const user = await User.findOne({
            email: cleanEmail
        }).select("+password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid password or email or user does not exist"
            })
        }

        const correctPassword = user.comparePassword(password)
        if (!correctPassword) {
            return res.status(401).json({
                status: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        // if successful
        return res.status(200).json({
            sucess: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                xp: user.xp,
                streak: user.streak,
                completedLessons: user.completedLessons
            }
        })
    } catch (err) {
        console.error("Login failure: ", err.message)
        return res.status(500).json({
            status: false,
            message: "Something went wrong during login"
        })
    }
}

const getMe = async (req, res) => {
    return res.status(200).json({
        sucess: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            xp: user.xp,
            streak: user.streak,
            completedLessons: user.completedLessons
        }
    })
}

module.exports = { registerUser, loginUser, getMe }