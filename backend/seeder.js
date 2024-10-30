import mongoose from "mongoose";
import Product from "./models/Product.js";

await mongoose.connect("mongodb://localhost:27017/myDB2");

await Product.deleteMany({});

const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White", "Orange", "Pink"]
const animals = ["Cat", "Dog", "Rabbit", "Turtle", "Hamster", "Guinea Pig", "Chinchilla", "Goat"]
const types = ["Food", "Toy", "Cage", "Bed", "Treats", "Toilet", "Harness", "Hat"]

const productsToCreate = [];
for (let i = 0; i < 1000; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)]
    const animal = animals[Math.floor(Math.random() * animals.length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const name = `${color} ${animal} ${type}`

    const price = Math.floor(Math.random() * 100)
    productsToCreate.push({ name: name, price: price })

}

await Product.insertMany(productsToCreate);