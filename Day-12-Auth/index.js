import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AllRoutes from './routes/index.js';



const app = express();
app.use(express.json());
dotenv.config();



app.get('/',(req,res)=>{
    res.send("Working..");
});

app.use('/api/v1', AllRoutes)

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB Connected.")
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000.")
});

