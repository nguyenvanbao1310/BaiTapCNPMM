import express, { Application } from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/configdb";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config view engine
viewEngine(app);

// Init web routes
initWebRoutes(app);

// Connect to DB
connectDB();

const port: number = Number(process.env.PORT) || 8088;
app.listen(port, () => {
  console.log(`✅ Backend Nodejs is running on the port: ${port}`);
});
