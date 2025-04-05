import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import expressRateLimit from "express-rate-limit";
import authenticateUser from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileCompleted: false, 
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId: newUser._id });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const createRateLimiter = (maxRequests, windowMinutes) => {
  return expressRateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    message: { message: `Too many requests, please try again after ${windowMinutes} minutes.` },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

const loginRateLimiter = createRateLimiter(5, 15);

router.post("/login",loginRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      role: user.role,
      WizardCompleted: user.profileCompleted,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



router.post('/google-login', async (req, res) => {
  const { email, name} = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, register them
      user = new User({ name, email, password: '',profileCompleted: true });
      user.profileCompleted = true; // Mark as completed
      await user.save();
    }

    // Create a session or token for authentication (if required)
    res.status(200).json({ message: 'Login Successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

export default router;