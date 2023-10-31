import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'

dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connection to database was successful")
}).catch(err=>console.log(err))

const app = express();

app.listen(3000,()=>{
    console.log("Server is listening on PORT 3000.");
});

app.use("/api/user",userRouter)