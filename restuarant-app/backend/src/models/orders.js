import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false })

const orderItem = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: [orderItemSchema],
        required: true
    },
    subtotal: {
        type: Number,
        min: 0,
        required: true
    },
    total: {
        type: Number,
        min: 0,
        required: true
    },
    status: {
        type: String,
        enum: [
            'pending',
            'paid',
            'preparing',
            'ready',
            'completed',
            'cancelled'
        ],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: [
            'pending',
            'failed',
            'refunded',
            'paid'
        ],
        default: 'paid'
    }
}, { timestamps: true });

const Order = new mongoose.model("Order", orderItem);
export default Order;