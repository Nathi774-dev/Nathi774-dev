import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, getMyOrders } from "../controllers/ordersController.js";

const router = express.Router();

// All order endpoints require authentication
router.use(protect);

router.post("/", createOrder);
router.get("/my-orders", getMyOrders);

export default router;