import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String },
    price: { type: Number }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;