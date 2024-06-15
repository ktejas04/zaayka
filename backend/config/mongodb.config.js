import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

export const connectDB = async () => {
    
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Error connecting to MongoDB", err))
}



// try {
//     const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     .then
//     // console.log(connectionInstance);
//     connectionInstance.
//     console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);


// } catch (error) {
//     console.log("MONGODB Connection error ", error);
//     process.exit(1);
// }