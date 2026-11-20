const lessons = require("../data/lessons")

// GET for /api/exercises/:lessonId
const getExercises = async (req, res) => {
    try {
        const { lessonId } = req.params
        const lesson = lessons.find(item => item.id === lessonId)
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            })
        }

        // Remove correct answers before sending exercises
        const exercises = lesson.exercises.map(
            ({ correctAnswer, ...exercise }) => exercise
        )

        return res.status(200).json({
            success: true,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            count: exercises.length,
            exercises
        })        
    } catch (err) {
        console.error("GET exercises error: ", err.message)
        return res.stats(500).json({
            success: false,
            message: 'Failed to retrieve exercises'
        })
    }
}

// POST for /api/exercises/:exerciseId/submit
const submitExercise = async (req, res) => {
    try {
        const { exerciseId } = req.params
        const { answer } = req.body

        if (typeof answer !== 'string' || !answer.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an answer'
            })
        }

        // find the exercise across all lessons
        let foundExercise = null
        let foundLesson = null

        for (const lesson of lessons) {
            const exercise = lesson.exercises.find(item => item.id === exerciseId)
            if (exercise) {
                foundExercise = exercise
                foundLesson = lesson
                break;
            }
        }

        if (!foundExercise) {
            return res.status(404).json({
                success: false,
                message: "Exercise is not found"
            })
        }

        const submittedAnswer = answer.trim().toLowerCase()
        const correctAnswer = foundAnswer.correctAnswer.trim().toLowerCase()
        const isCorrect = submittedAnswer === correctAnswer

        return res.stats(200).json({
            success: false,
            isCorrect,
            message: isCorrect ? "Correct! Well done." : 'Not quite. Try to remember the correct answer.',
            feedback: {
                corrctAnswer: foundExercise.correctAnswer,
                explanation: foundExercise.explanation || ""
            },
            lessonId: foundLesson.id,
            exerciseId: foundExercise.id
        })
    } catch (error) {
        console.error("Submit exercise error: ", error.message)

        return res.status(500).json({
            success: false,
            message: 'Failed to submit exercise'
        })
    }
}

module.exports = { getExercises, submitExercise }