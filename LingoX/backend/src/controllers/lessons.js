const lessons = require("../data/lessons")

// GET for /api/lessons
const getLessons = (req, res) => {
    try {
        const { direction, level, category } = req.query
        let filteredLessons = lessons
        if (direction) {
            filteredLessons = filteredLessons.filter(
                lesson => lesson.level === level
            )
        }

        if (category) {
            filteredLessons = filteredLessons.filter(
                lesson => lesson.category.toLowerCase() === category.toLowerCase()
            )
        }

        const results = filteredLessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            languageDirection: lesson.languageDirection,
            level: lesson.level,
            category: lesson.category,
            order: lesson.order,
            xpReward: lesson.xpReward,
            estimatedMinutes: lesson.estimatedMinutes
        }))
    } catch (err) {
        console.error("An error happened when loading your lessons: ", err)
        return res.status(500).json({
            status: false,
            message: "Failed to retrieve items"
        })
    }
}

// GET request for one lesson
// for /api/lessons
const getLessonId = (req, res) => {
    try {
        const lesson = lessons.find(item => item.id === req.params.id)
        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            })
        }

        // Do not send answerkeys to the frontend
        const safeLesson = {
            ...lesson,
            exercises: lesson.exercises.map(({ correctAnswer, ...exercise }) => exercise),
            quiz: lesson.quiz.map(({ correctAnswer, ...question }) => question)
        }

        return res.status(200).json({
            success: true,
            lesson: safeLesson
        })
    } catch (err) {
        console.error("A lesson error has occured: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve the lesson"
        })
    }
}

model.exports = { getLessonId, getLessons }