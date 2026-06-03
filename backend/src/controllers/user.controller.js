
// import { asynchandler } from "../utils/asynchandler.js";
// import {ApiError} from "../utils/ApiError.js";
// import {User} from "../models/user.models.js";
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
// import { ApiResponse } from "../utils/ApiResponse.js";


// const registerUser = asynchandler(async(req , res) => {
//     console.log("REGISTER API HIT");
//     const {email, username, fullName, password} = req.body
//     console.log("email: ", email);

// //   if([fullName, email, username, password].some((field) => field?.trim() === "")){
// //     throw new ApiError(400, "All fields are required")
// //   }
// if (
//   [fullName, email, username, password].some(
//     (field) => !field || field.trim() === ""
//   )
// ) {
//   throw new ApiError(400, "All fields are required");
// }

// const existedUser = await User.findOne({
//     $or: [{ username }, { email }]
// })

// if(existedUser){
//     throw new ApiError(409, "User with email or username already exists")
// }

// // const avatarLocalPath = req.files?.avatar[0]?.path;
// //  const coverImageLocalPath = req.files?.coverImage[0]?.path;
// const avatarLocalPath = req.files?.avatar?.[0]?.path;
// const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

//  if( !avatarLocalPath){
//     throw new ApiError(400, "Avatar file is required ")
//  }


//  const avatar = await uploadOnCloudinary(avatarLocalPath)
//  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

//  if(!avatar){
//     throw new ApiError(400, "Avatar file is required")
//  }

//  const user = await User.create({
//     fullName,
//     avatar: avatar.url,
//     coverImage: coverImage?.url || "",
//     email,
//     password,
//     username : username.toLowerCase()
//  })

//  const createdUser = await User.findById(user._id).select(
//     "-password - refreshToken"
//  )

//  if(!createdUser){
//     throw new ApiError(500, " Something went wrong while registering the user")
//  }
// return res.status(201).json(
//    new ApiResponse(200, createdUser, "User registered successfully")
// )


// })

// export { registerUser };

// import { asynchandler } from "../utils/asynchandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { User } from "../models/user.models.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// console.log("CONTROLLER VERSION 999");
// console.log("REGISTER API HIT");

// const registerUser = asynchandler(async (req, res) => {

//     console.log("=====================================");
//     console.log("REGISTER API HIT");
//     console.log("BODY:", req.body);
//     console.log("FILES:", req.files);
//     console.log("=====================================");

//     const { email, username, fullName, password } = req.body;

//     if (
//         [fullName, email, username, password].some(
//             (field) => !field || field.trim() === ""
//         )
//     ) {
//         throw new ApiError(400, "All fields are required");
//     }

//     console.log("STEP 1: Validation Passed");

//     const existedUser = await User.findOne({
//         $or: [{ username }, { email }]
//     });

//     if (existedUser) {
//         throw new ApiError(
//             409,
//             "User with email or username already exists"
//         );
//     }

//     console.log("STEP 2: User Doesn't Exist");

//     const avatarLocalPath = req.files?.avatar?.[0]?.path;
//     const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

//     console.log("Avatar Path:", avatarLocalPath);
//     console.log("Cover Image Path:", coverImageLocalPath);

//     if (!avatarLocalPath) {
//         throw new ApiError(400, "Avatar file is required");
//     }

//     console.log("STEP 3: Uploading Avatar");

//     const avatar = await uploadOnCloudinary(avatarLocalPath);

//     console.log("Avatar Upload Result:", avatar);

//     const coverImage = await uploadOnCloudinary(
//         coverImageLocalPath
//     );

//     console.log("Cover Upload Result:", coverImage);

//     if (!avatar) {
//         throw new ApiError(
//             400,
//             "Avatar upload failed"
//         );
//     }

//     console.log("STEP 4: About To Create User");

//     try {

//       //   const user = await User.create({
//       //       fullName,
//       //       avatar: avatar.url,
//       //       coverImage: coverImage?.url || "",
//       //       email,
//       //       password,
//       //       username: username.toLowerCase()
//       //   });
//       console.log("BEFORE USER CREATE");

// return res.status(200).json({
//     success: true,
//     message: "Controller reached successfully"
// });

//         console.log("STEP 5: User Created");
//         console.log(user);

//         const createdUser = await User.findById(
//             user._id
//         ).select("-password -refreshToken");

//         console.log("STEP 6: User Retrieved");

//         if (!createdUser) {
//             throw new ApiError(
//                 500,
//                 "Something went wrong while registering user"
//             );
//         }

//         return res.status(201).json(
//             new ApiResponse(
//                 200,
//                 createdUser,
//                 "User registered successfully"
//             )
//         );

//     } catch (error) {

//         console.log("=====================================");
//         console.log("USER CREATE ERROR");
//         console.error(error);
//         console.log("=====================================");

//         throw error;
//     }
// });

// export { registerUser };
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
});

export { registerUser };