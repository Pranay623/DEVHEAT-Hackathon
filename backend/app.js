import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authroutes.js";
import userRoutes from "./src/routes/userRoutes.js"; 

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 AI Mock Interview Platform Backend is Running!");
});

export default app;
