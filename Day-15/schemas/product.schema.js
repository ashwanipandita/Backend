import mongoose, { Schema } from "mongoose";
import Joi from "joi";

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  quantity: Number,
  tags: [String],
});

const ProductSchema2 = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required().min(5).max(200),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required().min(1),
});

const ProductSchema = mongoose.model("Product", productSchema);
export { ProductSchema, ProductSchema2 };


