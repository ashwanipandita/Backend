import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductSchema from "./schemas/product.schema.js";
const app = express();
dotenv.config()
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Working")
});

app.post('/add-product',async(req,res)=>{
    try{
const {name,category,price,quantity}= req.body;
if(!name|| !category|| !price|| !quantity){
    return res.json({success:false,error:"All fields are required"});
}

const newProduct = new ProductSchema({
name : name,
category : category,
price: price,
quantity : quantity,
});

await newProduct.save();
return res.json({success:true,error:"Product successfully stored"});

    }catch(error){
        return res.json({success:false,error});
    }
});

app.get("/get-product", async function (req,res){
    try{
        const pipeline = [
            {$match:{ category:"electronics", price:{$gt:9000}}},
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

mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("DB Connected");  
});

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
});