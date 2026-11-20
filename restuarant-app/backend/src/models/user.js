import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false
    },
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem"
        }
    ],
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;