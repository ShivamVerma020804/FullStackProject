// import {v2 as cloudinary} from "cloudinary"
// import fs from "fs"



// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

// const uploadOnCloudinary = async (localFilePath) => {
//     try{
//         //uploading the file
//         const response = cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // console.log("file is uploaded on cloudinary", response.url);
//         fs.unlinkSync(localFilePath)
//         return response;

//     }catch(error){
//         fs.unlinkSync(localFilePath) //removes the locally saved temporary files once the upload operation fails
//         return null;

//     }
// }

// export {uploadOnCloudinary}

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"
            }
        );

        console.log("Cloudinary Upload Success:");
        console.log(response.secure_url);

        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {

        console.log("CLOUDINARY ERROR:");
        console.error(error);

        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export { uploadOnCloudinary };