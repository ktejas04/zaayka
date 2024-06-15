import Food from "../models/food.models.js";
import fs from "fs"



//Add Food Item

const addFoodItem = async(req,res) => {

    // console.log(req.file);
    let foodImage = "";
    if (req.file){
        foodImage = `${req.file.filename}` //Storing uploaded file name
    }

    // console.log(foodImage);

    const {name,description,price,category} = req.body;
    const food = new Food({
        name, description, price, category, foodImage
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