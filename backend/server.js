import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import { connectDB } from './config/mongodb.config.js';
import foodRouter from './routes/food.routes.js';
import userRouter from './routes/user.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';


// App Configuration
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(express.json()); //The json response from FE to BE is parsed using this

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data

// CORS Configuration
app.use(cors());
// app.use(cors({
//   origin: "https://zaayka.vercel.app", // Add frontend here
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// })); //Access BE from any FE
// app.use(express.urlencoded({ extended: false }));


//DB Connection
connectDB();

//API Endpoints
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

// Serving static files
app.use("/images", express.static("uploads")) //do not use /api/v1 for serving static files


//Get request for API endpoint
app.get('/', (req, res) => {
  res.send('API works!!');
});

//Run the express server
app.listen(PORT, () => {
  console.log(`Server running at at http://localhost:${PORT}`);
});


export {app}
