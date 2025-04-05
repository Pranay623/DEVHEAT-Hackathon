import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await User.findById(userId).select("-password"); // exclude password
    if (!result) return res.status(404).json({ message: "User not found" });

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
