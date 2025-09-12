import User from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//create token to login signup

const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req, res) => {
  try {
    const {name,email,password}=req.body;

     //checking user already exists or not
     const userExists=await User.findOne({email});
     if(userExists){
      return res.json({success:false, message:'User already Exists'});
     }
    //checking user valid  or not
    if(!validator.isEmail(email)){
       return res.json({success:false, message:'Please enter a valid email'});
    }
    if(password.length < 8){
       return res.json({success:false, message:'Please enter a strong password'});
    }
  
     //hashing the password
     const salt =await bcrypt.genSalt(10);
     const hashedPassword =await bcrypt.hash(password,salt);
     const newUser =new User({
      name,
      email,
      password:hashedPassword,
     })
     const user=await newUser.save();
     const token =createToken(user._id);
     return res.json({success:true,message:'User registred successfully',token});
  } catch (err) {
    console.log(err.message);
     return res.json({success:false,message:'User registred Failed'});
  }
};

//login user
const loginUser = async (req, res) => {
  try {
   const {email,password}=req.body;
   const user=await User.findOne({email});
   if(!user){
    return res.json({success:false,message:'User does not exists'});
   }

   const isMatch=await bcrypt.compare(password,user.password);
     if(isMatch){
      const token = createToken(user._id);
      res.json({success:true,token});
     }else{
      res.json({success:false,message:'invalid credential'});
     }

  } catch (err) {
    console.log(err.message);
     return res.json({success:false,message:'User Login Failed'});
  }
};

const adminLogin=async(req,res)=>{
  try{
   const {email,password}=req.body;
   if(email ===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    const token =jwt.sign(email+password,process.env.JWT_SECRET);
    res.json({success:true,token});
   }else{
    res.json({success:false,message:'Invalid credential'});
   }
  }catch(err){
  return res.json({success:false,message:'Admin authentication failed'});
  }
}

export {loginUser,registerUser,adminLogin}