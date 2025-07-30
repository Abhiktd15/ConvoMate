import User from "../models/User.model.js";
import { TryCatch } from "./error.js";
import jwt from 'jsonwebtoken'

export  const isAuthenticated = TryCatch(async (req,res,next) => {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized - No token provided!"
        })
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY)
    if(!decode){
        return res.status(401).json({
            success:false,
            message:"Unauthorized - Invalid Token!"
        })
    }

    const user = await User.findById(decode.userId).select("-password");
    if(!user){
        return res.status(401).json({
            success:false,
            message:"Unauthorized - User not Found!"
        })
    }

    req.user = user;
    
    next();
})