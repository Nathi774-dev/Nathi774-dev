import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from "./routes/orderRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import favouriteRoutes from "./routes/favouriteRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Body parsers must come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/payments", paymentRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/reservations", reservationRoutes);

// Start the server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();