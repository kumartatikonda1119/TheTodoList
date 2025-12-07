import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../backend/routes/route.todo.js";
import userRoute from "../backend/routes/route.user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const origin = process.env.FRONTEND_URL;
console.log("FRONTEND_URL:", origin);
try {
  await mongoose.connect(MONGODB_URI);
  console.log("connected to database ✅");
} catch (e) {
  console.log("there is an error in connecting to mongodb");
  console.log(e);
}

app.use(cookieParser());
app.use(cors({ 
  origin: origin,
   credentials: true,
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"],
  }));
dotenv.config();
app.use(express.json());

app.use("/todo", todoRoute);

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hey hello from kumar");
});

app.listen(PORT, () => {
  console.log(`server running on port  http://localhost:${PORT}`);
});
