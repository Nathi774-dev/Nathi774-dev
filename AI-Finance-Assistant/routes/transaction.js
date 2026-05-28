const express = require("express")
const Transaction = require("../models/Transaction")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

// Add
router.post("/", authMiddleware, async (req, res) => {
    const transaction = new Transaction({
        ...require.body,
        userId: req.userId
    })

    await transaction.save()
    res.json(transaction)
})

// GET
router.get("/", authMiddleware, async (req, res) => {
    const data = await Transaction.find({ userId: req.userId })
    res.json(data)
})

module.exports = router;