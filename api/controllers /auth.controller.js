import User from './../models/user.model.js'
import bcryptjs from 'bcryptjs';
import {errorHandler} from './../utils/error.js'
import jwt from 'jsonwebtoken'

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


export const signin = async(req,res,next)=>{
    const {email,password} = req.body;
    try{

        const userIsValid = await User.findOne({email});
        if(!userIsValid)return next(errorHandler(404,'User not found.'));
        const isPasswordValid = bcryptjs.compareSync(password,userIsValid.password);
        if (!isPasswordValid)return next(errorHandler(401,'Either email or password do not match.'));
        const token = jwt.sign({id:userIsValid._id},process.env.JWT_SECRET)
        const {password:pass,...rest} = userIsValid._doc;
        res.cookie('access_token',token,{httpOnly:true,expires:new Date(Date.now()+ 60 )}).status(200).json(rest);

    }catch(err){
        next(error);
    }
}