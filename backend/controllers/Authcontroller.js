const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userModel = require("../models/user");

const signUp = async(req,res) =>{
  try {
    const {firstName,lastName,email,password} = req.body;
    console.log(req.body)
    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"user already exist",success:false})
    }
    const newUser = new userModel({firstName,lastName,email,password});
    newUser.password = await bcrypt.hash(password,10);
    await newUser.save();
    res.status(201).json({message:"user created successfully",success:true})
  } catch (error) {
    res.status(500).json({message:"internal server error",success:false})
  }
} 
const login = async(req,res) =>{
    try {
      const {email,password} = req.body;
      console.log(req.body)
      const user = await userModel.findOne({email});
      if(!user){
          return res.status(403).json({message:"auth failed email or password invalid",success:false})
      }
      const isPassword = await bcrypt.compare(password,user.password);
      if(!isPassword){
        return res.status(403).json({message:"auth failed email or password invalid",success:false})

      }
      const jwtToken =  jwt.sign({email:user.email,_id:user._id},process.env.SECRET_KEY,{expiresIn:"12h"})
      res.status(200).json({message:"login successfully",success:true,jwtToken,email,firstName:user.firstName})
    } catch (error) {
      res.status(500).json({message:"internal server error",success:false})
    }
  } 
module.exports = {
    signUp,
    login
}