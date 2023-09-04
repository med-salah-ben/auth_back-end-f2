const User = require("../model/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

//Create New Account(USER)
exports.userRegister = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    // check all fields
    if (!name || !lastName || !email || !password) {
      return res.status(401).json({ msg: "Please enter all fields!" });
    }
    // check if user exist
    let checkUser = await User.findOne({ email: email });
    if (checkUser) {
      return res.status(400).send({ msg: "User Already Exist!" });
    }
    const newUser = new User({ ...req.body });
    // hash psw
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    newUser.save();

    //JWT Config
    const payload = {
      id: newUser._id,
    };

    let token = await jwt.sign(payload, process.env.SECRETORKEY);

    return res
      .status(200)
      .send({ msg: "User Register Successfully.", response: newUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Can not save User" });
  }
};

//Sign to your Account
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check all fields
    if (!email || !password) {
      return res.status(401).json({ msg: "Please enter all fields!" });
    }
    // check if user exist
    let checkUser = await User.findOne({ email: email });
    // console.log("checkUser : " , checkUser);
    if (!checkUser) {
      return res.status(400).send({ msg: "User Not Exist!" });
    }

    // hash psw
    const saltRounds = 10;
    const matchPassword = await bcrypt.compare(password, checkUser.password);
    if (!matchPassword) {
      return res.status(400).send({ msg: "Wrong Password!" });
    }
    //JWT Config
    const payload = {
      id: checkUser._id
    };

    let token = await jwt.sign(payload, process.env.SECRETORKEY , { expiresIn: '1h' });
    return res
      .status(200)
      .send({ msg: "User Login Successfully.", response: checkUser , token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Can not Login User" });
  }
};


//GET USER
exports.getUser = (req,res)=>{
    res.status(200).send({msg:"Get User Success ",user:req.user})
}