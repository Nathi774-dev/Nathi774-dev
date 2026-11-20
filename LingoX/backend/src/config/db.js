const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI
        if (!mongoURI) {
            throw new Error("Mongo URI is undefined or missing from environment variables")
        }

        const connection = await mongoose.connect(mongoURI)
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (e) {
        console.error('MongoDB connection failed: ', e.message);
        console.log("Mongo URI loaded:", Boolean(process.env.MONGO_URI));
        process.exit(1);
    }
}

module.exports = connectDB