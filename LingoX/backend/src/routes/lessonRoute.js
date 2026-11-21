const express = reqire("express")

const { getLessons, getLessonId } = require("../controllers/lessons")
const { protect } = require("../middleware/auth")
const router = express.Router()

router.get("/", getLessons)
router.get("/:id", getLessonId)

module.exports = router