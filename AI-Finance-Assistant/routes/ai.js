const express = require("express")
const OpenAI = require("openai")
const Transaction = require("../models/Transaction")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

router.post("/", authMiddleware, async (req, res) => {
    const { question } = req.body
    const transactions = await Transaction.find({ userId: req.userId })

    const summary = transactions.map(transaction => {
        `${transaction.type}: ${transaction.text} - R${transaction.amount}`
    }).join("\n")

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{
            role: 'user',
            content: `Financial data: \n${summary}\n\nQuestion: ${question}`
        }]
    })

    res.json({ reply: response.choices[0].message.content })
})

module.exports =  router;