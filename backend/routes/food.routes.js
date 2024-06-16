import { Router} from "express";
import { addFoodItem, getFoodList, deleteFoodItem } from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const foodRouter = Router();

//Post - to send data to server => req, then we get response => res


foodRouter.post("/add", upload.single("image"), addFoodItem); //image is fieldname (jis fieldName se upload hoga), can be accessed in multer

foodRouter.get("/list", getFoodList);

foodRouter.post("/delete/:id", deleteFoodItem);

export default foodRouter;