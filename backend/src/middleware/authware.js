import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const authenticateToken = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"No token provided"})
        }
        const tokenDecoded = jwt.verify(token,process.env.SECRET_KEY);
        if(!tokenDecoded){
            return res.status(401).json({message:"Unauthorized Access"})
        }
        const user = await User.findById(tokenDecoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"})    
        }   
        req.user = user
        next()
    } catch (error) {
        console.log("Error in authenticate Token",error.message);
        res.status(500).json("Internal Server error")
    }
}