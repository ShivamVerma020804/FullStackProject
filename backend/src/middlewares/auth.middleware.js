// to verify if the user exist or not

import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import jwt  from "jsonwebtoken"


export const verifyJWT = asynchandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log("Received Token:", token);
console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
        if(!token){
            throw  new ApiError(401, "Unauthorized Request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
       const user =  await User.findById(decodedToken?._id).select("-password -refreshToken")
    
       if(!user){
        throw new ApiError(401, "Invalid Access Token")
       }
    
       req.user = user;
       next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invaid Access Token")
        
    }






})