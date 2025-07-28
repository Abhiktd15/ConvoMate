import { TryCatch } from "../middlewares/error.js"
import User from "../models/User.model.js"
import jwt from 'jsonwebtoken'


const signup = TryCatch(async(req ,res) => {
    const {fullName,email,password} = req.body

    if(!email || !fullName || !password){
        return res.status(400).json({
            success:false,
            message:"All Fields are required!"
        })
    }

    if(password.length < 6){
        return res.status(400).json({
            success:false,
            message:"Password must be at least 6 characters!"
        })
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User with this email already exists!"
        })
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

    const newUser = await User.create({
        email,
        fullName,
        password,
        profilePic:randomAvatar
    })
    const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
    
    res.cookie("jwt",token,{
        maxAge: 1*24*60*60*1000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV === 'production'
    })
    return res.status(201).json({
        success:true,
        message:"User Registered Successfully!",
        user:newUser
    })
})

const login = TryCatch(async(req ,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All Fields are required!"
        })
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid User Credentials!"
        })
    }
    const isPasswordCorrect = await user.matchPassword(password)
    if(!isPasswordCorrect){
        return res.status(401).json({
            success:false,
            message:"Invalid User Credentials!"
        })
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
    
    res.cookie("jwt",token,{
        maxAge: 1*24*60*60*1000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV === 'production'
    })

    
    return res.status(200).json({
        success:true,
        message:`Welcome Back, ${user.fullName}`,
        user
    })
})

const logout = TryCatch(async(req ,res) => {
    res.clearCookie("jwt")
    res.status(200).json({
        success:true,
        message:"Logout Successfull..."
    })
})

export {login,logout,signup}