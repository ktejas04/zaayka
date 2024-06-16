import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


const uploadOnCloudinary = async (localFilePath) => {

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    try {
        if (!localFilePath) return null

        //Upload the file on cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        console.log("File uploaded successfully");
        // console.log(uploadResult);
        // console.log(uploadResult.url);  check what is secure_url
        fs.unlinkSync(localFilePath);

        return uploadResult;
    } catch (error) {
        console.log(error);
        fs.unlinkSync(localFilePath)  //remove locally saved temporary file as upload operation failed
        return null;
    }
}

export {uploadOnCloudinary}

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: "zaaykacloud", 
//         api_key: "465798588438434", 
//         api_secret: "<your_api_secret>" // Click 'View Credentials' below to copy your API secret
//     });
    
//     // Upload an image
//     const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
//         public_id: "shoes"
//     }).catch((error)=>{console.log(error)});
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url("shoes", {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url("shoes", {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();

