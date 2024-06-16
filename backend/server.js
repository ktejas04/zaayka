  import express from 'express';
  import cors from 'cors';
  import dotenv from "dotenv";
  import { connectDB } from './config/mongodb.config.js';
  import foodRouter from './routes/food.routes.js';
  import userRouter from './routes/user.routes.js';
  import cartRouter from './routes/cart.routes.js';
  import orderRouter from './routes/order.routes.js';
  import adminRouter from './routes/admin.routes.js';

//Load environment variables
  dotenv.config();

  // App Configuration
  const app = express();
  const PORT = process.env.PORT || 3000;

  // console.log(process.env.CORS_ORIGIN_FRONTEND, process.env.CORS_ORIGIN_ADMIN);
  // CORS Configuration
  app.use(cors());
  // app.use(cors({
  //   // origin: [process.env.CORS_ORIGIN_FRONTEND, process.env.CORS_ORIGIN_ADMIN], // Add frontend here
  //   // methods: ["GET", "POST", "PUT", "DELETE"],
  //   origin: process.env.CORS_ORIGIN,
  //   methods: ["GET", "POST", "PUT", "DELETE"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  //   credentials: true,
  // })); //Access BE from any FE
  // app.use(express.urlencoded({ extended: false }));

  // Middlewares
  app.use(express.json()); //The json response from FE to BE is parsed using this
  app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data

  //DB Connection
  connectDB();

  //API Endpoints
  app.use("/api/v1/food", foodRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRouter);
  app.use("/api/v2/admin", adminRouter);

  // Serving static files
  app.use("/images", express.static("public")) //do not use /api/v1 for serving static files


  //Get request for API endpoint
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>API Status</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f4f4f4;
            }
            .container {
              text-align: center;
              padding: 20px;
              background: white;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>API Status</h1>
            <p>The API is running smoothly.</p>
          </div>
        </body>
      </html>
    `);
  });

  //Run the express server
  app.listen(PORT, () => {
    console.log(`Server running at at http://localhost:${PORT}`);
  });


  // export {app}
