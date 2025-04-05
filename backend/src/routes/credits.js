import express from "express";
import { User } from "../models/User.js";
const router = express.Router();

router.get("/points/:id", async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId).select("credits");
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      return res.status(200).json({ credits: user.credits });
    } catch (err) {
      console.error("Error fetching credits:", err);
      return res.status(500).json({ message: "Server error" });
    }
  });

export default router;
