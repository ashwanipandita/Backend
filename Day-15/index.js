import  express  from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import {ProductSchema,ProductSchema2} from "./schemas/product.schema.js";
// import { valid } from "joi";
const app = express();
dotenv.config()
app.use(express.json());
import Joi from "joi";

app.get('/',(req,res)=>{
    res.send("Working")
});

app.post('/add-product',async(req,res)=>{
    try{
const {name,category,price,quantity,tags}= req.body;
if(!name|| !category|| !price|| !quantity || !tags){
    return res.json({success:false,error:"All fields are required"});
}

const newProduct = new ProductSchema({
name : name,
category : category,
price: price,
quantity : quantity,
tags : tags,
});

await newProduct.save();
return res.json({success:true,message:"Product successfully stored"});

    }catch(error){
        return res.json({success:false,error});
    }
});

app.get("/get-product", async function (req,res){
    try{
        const pipeline = [
            {$match:{ category:"electronics", price:{$gt:98000}}},
            {
                $group:{
                    _id : "$product",
                    totalQuantity : {$sum:"$quantity"},
                    totalPrice:{$sum:{$multiply: ["$quantity","$price"]}},
                },
            },
        ];

        const aggResult = await ProductSchema.aggregate(pipeline);

        return res.json ({
            success: true,
            message:"Products Aggregated",
            data: aggResult,
        });
    } catch (error) {
        return res.json({success:false,message:"Error",error});
    }
})
app.post("/get-products", async (req, res) => {
    try {
        const agrregation = [
            {
                $match : {category :"electronics",price:{$gt:30000}},
            },
            {
                $group:{
                    _id:"$product",
                    totalQuantity:{$sum:"$quantity"},
                    totalPrice:{$sum: {$multiply:["$quantity", "$price"]}},
                },
            },
        ];
        const filteredProducts = await ProductSchema.aggregate(agrregation);
        console.log(filteredProducts,"filteredProducts");
        res.send(true);
    }catch (error){
        return res.json({success:false,error});
    }
});


app.post("/unwind-projecting", async (req,res)=>{
    try{
        const aggregation =[{$unwind : "$tags"},{$project : {name : 1, price : 1}}];
        const filteredProducts = await ProductSchema.aggregate(aggregation);
        console.log(filteredProducts);
        res.send(true);

    } catch (error){
        return res.json[{success: false,error}];
    }
});


app.post("/Joi-validate", async (req, res) => {
    try {
      const { name, category, price, quantity, tags } = req.body;
      
      // Validate the request body using ProductSchema2
      const validationResult = ProductSchema2.validate(req.body);
  
      // Check if validation failed
      if (validationResult.error) {
        return res.status(400).json({ success: false, error: validationResult.error.details });
      }
  
      // If validation passes, create a new product and save it to the database
      const newProduct = new ProductSchema({
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        tags: tags,
      });
      
      await newProduct.save();
      
      return res.json({ success: true, message: "Product successfully stored" });
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  });


mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("DB Connected");  
});

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});