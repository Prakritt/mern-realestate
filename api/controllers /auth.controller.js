import User from './../models/user.model.js'
import bcryptjs from 'bcryptjs';
import {errorHandler} from './../utils/error.js'

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    const hash_pw = bcryptjs.hashSync(password,16); 
    const newUser = new User({username,email,password:hash_pw})
    try{
        await newUser.save();
        res.status(201).json({"message":"user created successfully"})
    }catch(error){
        next(error);
    }
}