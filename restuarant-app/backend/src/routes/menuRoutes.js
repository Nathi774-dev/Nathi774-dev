import express from "express";
import { createMenuItem, getMenuItems } from "../controllers/menuItemController.js";
import { requireAdmin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Anyone can view the menu
router.get("/", getMenuItems);

//Only the admin can add new items
router.post("/", protect, requireAdmin, createMenuItem);

export default router;