const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: true })

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    tables: {
        type: [tableSchema],
        default: [],
    }
}, { timestamps: true })

const Location = new mongoose.model("Location", locationSchema);
export default Location;