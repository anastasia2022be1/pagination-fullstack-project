import mongoose from "mongoose";

export async function connect() {
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
        console.error("Failed to connect to MongoDB", err);
    });

    const host = process.env.MONGO_DB_URI
    await mongoose.connect(host);
}