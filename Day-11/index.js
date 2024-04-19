import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

app.get('/',(req,res)=>{
    res.send("Working..")
});

app.get("/filter-users", async (req, res) => {
try{

}catch(error){
    return res.status(500).json({error, success: false});
}
});

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("DB connected.");
});


app.listen(3000,()=>{
    console.log("Server is listening on port 3000.");
});