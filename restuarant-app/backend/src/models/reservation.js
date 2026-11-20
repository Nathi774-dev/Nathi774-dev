
import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        locationId: {
            type: String,
            required: true,
            enum: ["main", "baywest", "walmer"]
        },
        tableId: {
            type: Number,
            required: true
        },
        date: {
            type: String,
            required: true,
            match: /^\d{4}-\d{2}-\d{2}$/
        },
        time: {
            type: String,
            required: true,
            match: /^([01]\d|2[0-3]):[0-5]\d$/
        },
        guests: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },
        status: {
            type: String,
            enum: ["confirmed", "cancelled"],
            default: "confirmed"
        }
    },
    { timestamps: true }
);

reservationSchema.index(
    { locationId: 1, tableId: 1, date: 1, time: 1 },
    {
        unique: true,
        partialFilterExpression: { status: "confirmed" }
    }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
