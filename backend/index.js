import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../backend/routes/route.todo.js";
import userRoute from "../backend/routes/route.user.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
// Load environment variables as early as possible
dotenv.config();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

// Support multiple frontend origins via FRONTEND_URLS (comma-separated),
// fallback to single FRONTEND_URL
const originList = (
  process.env.FRONTEND_URLS
    ? process.env.FRONTEND_URLS.split(",")
    : [process.env.FRONTEND_URL]
)
  .filter(Boolean)
  .map((o) => o.trim());
console.log("Allowed CORS origins:", originList);
try {
  await mongoose.connect(MONGODB_URI);
  console.log("connected to database ✅");
} catch (e) {
  console.log("there is an error in connecting to mongodb");
  console.log(e);
}

app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (originList.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// Handle preflight for all routes
app.options(
  "*",
  cors({
    origin: originList,
    credentials: true,
  })
);
app.use(express.json());

app.use("/todo", todoRoute);

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server running on port  http://localhost:${PORT}`);
});
