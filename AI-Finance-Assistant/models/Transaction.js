const { default: mongoose } = require("mongoose")

const transactionSchema = new mongoose.Schema({
    text: String,
    amount: Number,
    type: String,
    userId: String,
    date: { type: Date, default: Date.now }
})

module.exports =  mongoose.model("Transaction", transactionSchema);