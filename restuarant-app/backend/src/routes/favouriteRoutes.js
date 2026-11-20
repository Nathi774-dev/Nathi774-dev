import express from 'express';
import { protect } from "../middleware/authMiddleware.js";
import { getFavourites, addFavourite, removeFavourite } from "../controllers/favouriteController.js";

const router = express.Router()

// All favourite routes require authentication
router.use(protect)

router.get("/", getFavourites)
router.post("/:menuItemId", addFavourite)
router.delete("/:menuItemId", removeFavourite)

export default router;