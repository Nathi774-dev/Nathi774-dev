const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minLength: 3,
        maxLength: 25
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Strong password is required"],
        minLength: 8,
        select: false
    },
    xp: {
        type: Number,
        default: 0
    },
    streak: {
        type: Number,
        default: 0
    },
    completedLessons: {
        type: [String],
        default: []
    }
}, { timestamp: true })

// Hash the password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

// compare submitted password with hash
userSchema.methods.comparePassword = async function (clientPassword) {
    return bcrypt.compare(clientPassword, this.password)
}

const User = mongoose.model("User", userSchema);
module.exports = User