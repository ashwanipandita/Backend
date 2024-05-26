import  express  from "express";
import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import {ProductSchema,ProductSchema2} from "./schemas/product.schema.js";
// import Joi from "joi";
import cors from "cors";
import cookieParser from "cookie-parser";
import AllRoutes from "./routes/index.js"

// import { valid } from "joi";
const app = express();
var corsOptions = {
  origin : ["http://localhost:3000","https://reactmain.vercel.app"],
 credentials:true,
 };

 
dotenv.config()
app.use(express.json());
app.use(cookieParser());


app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send("Working")
});
app.use('/api/v1',AllRoutes)


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