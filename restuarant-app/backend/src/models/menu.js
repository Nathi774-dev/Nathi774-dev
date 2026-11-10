const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Pizzas',
            'Pies',
            'Salads',
            'Soups',
            'Desserts',
            'Drinks',
            'Other'
        ]
    },
    price: {
        type: String,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false }
}, { timestamps: true })

const MenuItem = new mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;