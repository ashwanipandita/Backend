import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Register } from './controllers/user.controller.js';

const app = express();

dotenv.config();

app.use(express.json());

app.get("/",(req , res) =>{
    res.send("Working..");
});

app.post("/register", Register);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected.");
  });


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});