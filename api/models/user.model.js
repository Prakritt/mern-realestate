import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique : true,
    },
    email : {
        type: String,
        required: true,
        unique : true,
    },
    password : {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default: "data:image/png;base64,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",

    },
},{timestamps:true})

const User = mongoose.model('User',userSchema)

export default User;