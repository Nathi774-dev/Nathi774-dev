const express = require("express")
const { getExercises, submitExercise } = require("../controllers/exercises")
const { protect } = require("../middleware/auth")
const router = express.Router()

// retrieve exercises for a lesson
router.get("/:lessonId", getExercises)

// submit a answer (login required)
router.post("/:exerciseId/submit", protect, submitExercise)

module.exports = router