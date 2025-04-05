import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authroutes.js";
import userRoutes from "./src/routes/userRoutes.js"; 
import wizardRoutes from "./src/routes/complete-profile.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins
}));

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/wizard", wizardRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 AI Mock Interview Platform Backend is Running!");
});

export default app;
