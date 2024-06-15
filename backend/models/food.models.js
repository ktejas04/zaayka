import mongoose, { Schema } from "mongoose";

const foodSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    foodImage : {
        type: String,
        required: true
    },
    category : {
        type: String,
        required: true
    }
},{timestamps:true});

const Food = mongoose.models.food || mongoose.model("Food", foodSchema);

export default Food;