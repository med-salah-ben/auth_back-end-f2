const mongoose = require("mongoose");
const {Schema , model} = mongoose ; 

const userSchema = new Schema({
    name:{type:String , required:true},
    lastName:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true}
})

const User = model('Users', userSchema);

module.exports= User ;
