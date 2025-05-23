import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/complete-profile", async (req, res) => {
  const { userId, jobRole, experience, targetCompany, level } = req.body;

  // Check if all fields are present
  if (!userId || !jobRole || !experience || !targetCompany || !level) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        jobRole,
        experience,
        targetCompany,
        level,
        profileCompleted: true,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile completed", user });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
