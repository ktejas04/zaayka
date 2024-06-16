import Food from "../models/food.models.js";
import fs from "fs"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//Add Food Item

//Add validation for checking if food item exists, empty fields. Refer youtube

const addFoodItem = async(req,res) => {

    const {name,description,price,category} = req.body;
    
    // console.log(req.file);  file for upload.single and files for upload multiple
    /* 
    req.file is
        {
            fieldname: 'image',
            originalname: 'idli.jpg',
            encoding: '7bit',
            mimetype: 'image/jpeg',
            destination: './public/temp',
            filename: '1718437766063idli.jpg',
            path: 'public/temp/1718437766063idli.jpg',
            size: 29238
        }
    */

    //now we will pass the path to cloudinary
    // let image = req.file?.filename;
    // console.log(image);
    let imageLocalPath = req.file?.path;
    // console.log(imageLocalPath);

    //check if image was provided
    if (!imageLocalPath) {
        res.json({ //req.file is empty {}.
            success: false,
            message: "No Image Provided"
        })
    }

    //Upload the image to cloudinary
    const image = await uploadOnCloudinary(imageLocalPath);
    // console.log(newImage);
    /* image is {
    asset_id: 'e1d93c4ad4e7dd754cf367392414ebb2',
    public_id: 'i0mh0fltyzsoqmxwfe7f',
    version: 1718441131,
    version_id: '9aacba39432a42d06287fb50718bed55',
    signature: '491bdaf19101dfcebcdc89de01d04bdc65463d56',
    width: 686,
    height: 386,
    format: 'jpg',
    resource_type: 'image',
    created_at: '2024-06-15T08:45:31Z',
    tags: [],
    bytes: 58551,
    type: 'upload',
    etag: '6ef70ce584367cb94178122b3d33caa3',
    placeholder: false,
    url: 'http://res.cloudinary.com/zaaykacloud/image/upload/v1718441131/i0mh0fltyzsoqmxwfe7f.jpg',
    secure_url: 'https://res.cloudinary.com/zaaykacloud/image/upload/v1718441131/i0mh0fltyzsoqmxwfe7f.jpg',
    asset_folder: '',
    display_name: 'i0mh0fltyzsoqmxwfe7f',
    original_filename: '1718441129207dosa',
    api_key: '465798588438434'
    } */
    
   if(!image){ 
    res.json({
        success: false,
        message: "Error: Image Not Uploaded"
    })}


    //Food.create()
    const food = new Food({
        name, description, price, category, image: image.secure_url
    })

    try {
        await food.save();
        res.json({
            success: true,
            message: "Food Item Added Successfully",
            food
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error : Food Item Not Added",
            error: error.message
        })
    }
}

// All Food Lists

const getFoodList = async(req,res) => {
    try {
        const foodList = await Food.find();
        res.json({
            status: 201,
            success: true,
            data: foodList
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}

//Delete Food Item

const deleteFoodItem = async(req,res) => {
    console.log(req.params);
    const {id} = req.params;
    try {
        const foodItem = await Food.findByIdAndDelete(id);
        fs.unlink(`uploads/${foodItem.foodImage}`, () => {})  //delete from folder
        res.json({
            success: true,
            message: "Food Item Deleted Successfully",
            foodItem
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error : Food Item Not Deleted",
            error: error.message
        })
    }
}

export { addFoodItem, getFoodList, deleteFoodItem }