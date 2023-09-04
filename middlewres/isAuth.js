const jwt = require("jsonwebtoken");
require("dotenv").config({path:"../.env"})
const User = require("../model/user");

const isAuth = async(req,res,next)=>{

    try {
        const token = req.headers['x-auth-token'];
        // Check if Token
        if(!token){
            return res.status(400).send({msg:"no token unauthorized!"});
        }
        // Return User ID
        let decoded = jwt.verify(token, process.env.SECRETORKEY);
        console.log("decoded : " , decoded)
        //Check if decoded.id already exist in ID user collection
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(400).send({msg:"unauthorized!!!"});
        }
        //GET User
        req.user = user ;
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Token is not Valid!"});
    }

}

module.exports=isAuth;