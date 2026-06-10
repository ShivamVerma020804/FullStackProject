
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessandRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
       const accessToken =  user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
       await user.save({ validateBeforeSave: false })

       return {accessToken, refreshToken}

    }catch (error){
        throw new ApiError(500, "something went wrong while generating refresh and access tokens")
    }
}

const registerUser = asynchandler(async (req, res) => {

    const { email, username, fullName, password } = req.body;

    if (
        [fullName, email, username, password].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(
            409,
            "User with email or username already exists"
        );
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    console.log("FILES RECEIVED:");
console.dir(req.files, { depth: null });

console.log("BODY RECEIVED:");
console.dir(req.body, { depth: null });

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("AVATAR:", avatar);

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log("COVER:", coverImage);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    try {

        console.log("BEFORE USER CREATE");

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        });

        console.log("USER CREATED SUCCESSFULLY");
        console.log(user);

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        return res.status(201).json(
            new ApiResponse(
                201,
                createdUser,
                "User registered successfully"
            )
        );

    } catch (error) {

        console.log("=================================");
        console.log("USER CREATE ERROR");
        console.error(error);
        console.log("=================================");

        return res.status(500).json({
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
})

const loginUser = asynchandler(async(req, res) => {

    const {email, username, password} = req.body
    if(!(username || email)){
        throw new ApiError(400, "username or password is required")
    }

    const user = await User.findOne({
        $or:[{username}, {email}]
    })

    if(!user) {
        throw new ApiError(404, "User does not exist")
    } 

     const isPasswordValid = await user.isPasswordCorrect(password)
       if(!isPasswordValid) {
        throw new ApiError(404, "Incorrect Password")
    } 

    const {accessToken, refreshToken} = await generateAccessandRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200,
        {
            user:loggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
    ));




});

const logoutUser = asynchandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        );
});

const refreshAccessToken = asynchandler(async(req, res) => {
    const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingrefreshToken){
        throw new ApiError(401, "unauthorized request")
    }

   try {
     const decodedToken = jwt.verify(
         incomingrefreshToken, 
         process.env.REFRESH_TOKEN_SECRET
     )
 
     const user = await User.findById(decodedToken?._id)
     if(!user){
         throw new ApiError(401, "Invalid refresh token")
     }
 
     if(incomingrefreshToken !== user?.refreshToken){
         throw new ApiError(401, "Refresh token is expired or used")
     }
 
     const options = {
         httpOnly: true,
         secure: true
     }
 
     const {accessToken, newRefreshToken} = await generateAccessandRefreshTokens(user._id)
 
     return res
     .status(200)
     .cookie("accessToken", accessToken, options)
     .cookie("refreshToken", refreshToken, options)
     .json(
         new ApiResponse(
             200, 
             {
                 accessToken, refreshToken: newRefreshToken
             },"Access Token Refreshed"
 
         )
     )
 
   } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh Token")
    
   }


})

const changeCurrentPassword = asynchandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

   const user =  User.findById(req.user?._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
  if(!isPasswordCorrect){
    throw new ApiError(400, "Invalid Old Password")
  }

  user.password = newPassword
  user.save({validateBeforeSave: false})

  return res
  .status(200)
  .json(new ApiResponse(200, {}, "Password changed successfully"))

})

const getCurrentUser = asynchandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched sucessfully"))
})

const updateAccountDetails = asynchandler(async(req, res) => {
    const {fullName, email} = req.body
    if(!fullName || !email){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                fullName,
                email:email
            }
        },
        {new : true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asynchandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is missing")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(!avatar.uril){
        throw new ApiError(400, "Error while uploading avatar")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

        return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar Image has been updated")
    )
})

const updateUserCoverImage = asynchandler(async(req, res) => {
    const coverLocalPath = req.file?.path

    if(!coverLocalPath){
        throw new ApiError(400, "Avatar cover file is missing")
    }

    const coverImage = await uploadOnCloudinary(coverLocalPath)

    if(!coverImage.uril){
        throw new ApiError(400, "Error while uploading avatar")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Cover Image has been updated")
    )
})
   


export { registerUser,
    loginUser,
    logoutUser, refreshAccessToken,
    changeCurrentPassword, getCurrentUser,
    updateAccountDetails, updateUserAvatar, 
    updateUserCoverImage
 };