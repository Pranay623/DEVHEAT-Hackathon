import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/profile/update", async (req, res) => {
  const { userId, jobRole, experience, targetCompany, level } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update profile
    user.jobRole = jobRole;
    user.experience = experience;
    user.targetCompany = targetCompany;
    user.level = level;
    user.profileCompleted = true; // Mark as completed

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
