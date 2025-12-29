import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../backend/routes/route.todo.js";
import userRoute from "../backend/routes/route.user.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// Load environment variables as early as possible
dotenv.config();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

try {
  await mongoose.connect(MONGODB_URI);
  console.log("connected to database ✅");
} catch (e) {
  console.log("there is an error in connecting to mongodb");
  console.log(e);
}

app.use(cookieParser());
app.use(express.json());

app.use("/todo", todoRoute);

app.use("/user", userRoute);

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "public")));

// Catch all handler: send back React's index.html file for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on port  http://localhost:${PORT}`);
});
