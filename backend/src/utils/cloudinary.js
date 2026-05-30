import {v2 as cloudinary} from "cloudinary"
import fs from "fs"



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        //uploading the file
        const response = cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("file is uploaded on cloudinary", response.url);
        return response;

    }catch(error){
        fs.unlinkSync(localFilePath) //removes the locally saved temporary files once the upload operation fails
        return null;

    }
}