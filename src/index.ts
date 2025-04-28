import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

import userRoute from "./routes/userRoute";
import myRestaurantRoute from "./routes/myRestaurantRoute";
import restaurantRoute from "./routes/restaurantRoute";
import orderRoute from "./routes/orderRoute";

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to db"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const url = process.env.API_URL!;
const interval = 300000;

const reloadWebsite = () => {
  axios
    .get(url)
    .then(() => {
      console.log("website reloaded");
    })
    .catch((error: Error) => {
      console.error(`Error : ${error.message}`);
    });
};

if (process.env.NODE_ENV === "production") {
  setInterval(reloadWebsite, interval);
}

const app = express();

app.use(cors());

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.get("/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from server endpoint" });
});

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "ok" });
});

app.use("/api/user", userRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});
