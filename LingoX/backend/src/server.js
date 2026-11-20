const express = require('express')
const authRoutes = require("./routes/authRoutes")
const connectDB = require("./config/db")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: process.env.CLIENT_URI
}))
app.use(express.json())

// routes
app.use("/api/auth", authRoutes)

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => console.log(`Server connected on port ${PORT}`))
    } catch (e) {
        console.error("Server startup failed: ", e)
        process.exit(1)
    }
}

startServer()