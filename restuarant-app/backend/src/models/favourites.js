import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true
    }
}, { timestamps: true })

favouriteSchema.index({ user: 1, menuItem: 1 }, { unique: true });   // prevents users from having multiple favourites
const Favourite = mongoose.model("Favourite", favouriteSchema);
export default Favourite;