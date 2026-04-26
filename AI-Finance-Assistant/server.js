const connectDB = require("./config/db")
const authRoutes = require("./routes/auth")
const transactionRoutes = require("./routes/transaction")
const aiRoutes = require("./routes/ai")

// for error logging
const morgan = require("morgan")

const express = require("express")
const cors = require("cors")
require("dotenv").config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/ai", aiRoutes)

// logs every request to the console
app.use(morgan("dev"))
app.use(express.static("public"));
// Begin the server
app.listen(3000, () => console.log("Server is listenin..."))