import { Router} from "express";
import { addFoodItem, getFoodList, deleteFoodItem } from "../controllers/food.controller.js";
import multer from "multer";

const foodRouter = Router();

//Post - to send data tos erver +> req, then we get response +> res

//Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`); //Date,now for unique filename
    }
})
//File is stored in uploads folder

const upload = multer({storage})

foodRouter.post("/add", upload.single("image"), addFoodItem);

foodRouter.get("/list", getFoodList);

foodRouter.post("/delete/:id", deleteFoodItem);

export default foodRouter;