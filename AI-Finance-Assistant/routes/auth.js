const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { sendMail } = require("../utils/sendMail")

const router = express.Router()

// Sign Up
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(401).json({ error: "All fields are require to be filled in" })
        }

        const exists = await User.findOne({ email })
        if (exists) {
            return res.status(400).json({ error: "User already exists" })
        }

        const hashed = await bcrypt.hash(password, 10)
        const user = new User({ email, password: hashed })
        await user.save()

        res.json({ message: "User has successfully been created" })
        console.log("New signup attempt:", email)
    } catch (err) {
        console.error("Error: ", err.message)
        console.warn("Failed sign up:", email)
        return res.status(500).json({ error: "There has been a server side error" })
    }
})

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: "User not Found" })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({ error: "Incorrect password, please try again" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ token })
        console.log("Login attempt:", email)
    } catch (err) {
        console.error("Error: ", err.message)
        console.warn("Failed login attempt:", email)
        res.status(500).json({ error: "There has been a server error" })
    } 
})

// Forgot Password
router.post("/forgot", async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ error: "No user has been found" })
        }

        const code = Math.floor(100000 + Math.random() * 900000)

        user.resetCode = code
        user.resetCodeExpiry = Date.now() + 10 * 60 * 1000

        await  user.save()
        await sendMail(email, "Reset Code", `Your code is: ${code}`)
        res.json({ message: "Code has been sent" })
    } catch {
        res.status(500).json({ error: "There has been a server error" })
    }
})

// Reset the password
router.post("/reset", async (req, res) => {
    try {
        const { email, newPassword } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetCode !== code ) {
            return res.status(400).json({ error: "Your code is invalid" })
        } else if (user.resetCodeExpiry < Date.now()) {
            return res.status(400).json({ error: "Your is no longer valid, please try again" })
        }

        user.password = await bcrypt.hash(newPassword, 10)
        user.resetCode = null
        user.resetCodeExpiry = null

        await user.save()

        res.json({ message: "Password has been successfully reset" })
    } catch {
        return res.status(500).json({ error: "There has been a server error" })
    }
})

module.exports = router;