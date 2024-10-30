import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { connect } from "./db.js";

import productsRouter from "./routes/productsRouter.js"


// Создаем экземпляр приложения Express
const app = express();
app.use(cors());
app.use(express.json())

// Подключение к MongoDB
await connect();

app.use("/products", productsRouter);

// globale Fehlerbehandlung
app.use((err, req, res, next) => {
    // Custom error handling for different types of errors
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ "error": "Validation error", details: err.message });
    }
    console.error("error:", err)
    res.status(500).json({ error: err.message })
})

// Запуск сервера
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
