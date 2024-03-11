import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import userRoute from "./routes/userRoute";

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => console.log("Connected to db"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "ok" });
});

app.use("/api/user", userRoute);

app.listen(7000, () => {
  console.log("Server is working on localhost:7000");
});
