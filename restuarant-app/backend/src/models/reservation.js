import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
        required: true
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table"
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['completed', 'confirmed', 'cancelled'],
        default: "confirmed"
    }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;