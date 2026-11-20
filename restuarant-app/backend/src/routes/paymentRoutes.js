import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { createPayfastCheckout } from "../controllers/paymentController.js";
import {
    recievePayfastNotification,
} from "../controllers/payfastWebhookController.js";

const router = express.Router();

// PayFast calls this route directly, without a customer JWT.
router.post("/notify", recievePayfastNotification);

// Customers must be logged in to create a checkout.
router.post("/checkout", protect, createPayfastCheckout);

export default router;