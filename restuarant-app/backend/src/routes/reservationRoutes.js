import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    createReservation,
    getAvailableTables,
    getMyReservation,
    cancelReservation,
    getLocations
} from "../controllers/reservationController.js"

const router = express.Router()
router.post("/", protect, createReservation)
router.get("/locations", getLocations)
router.get("/availability", getAvailableTables)

// protected custmer routes
router.get("/my-reservations", protect, getMyReservation)
router.delete("/cancel/:id", protect, cancelReservation)

export default router;