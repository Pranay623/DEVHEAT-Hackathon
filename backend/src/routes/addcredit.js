import express from "express";
import { User } from "../models/User.js";
import { verifyToken } from "../middleware/auth.js"; // assuming you're using JWT

const router = express.Router();

router.post("/spin-result", async (req, res) => {
    try {
        const { userId, reward } = req.body;

        const validRewards = [50, 100, 150, 200, 250,300];
        if (!validRewards.includes(reward)) {
            return res.status(400).json({ message: "Invalid reward value" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.credits += reward;
        await user.save();

        return res.status(200).json({
            message: `Credited ${reward} successfully!`,
            reward,
            totalCredits: user.credits,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/deduct-credits", async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if user has enough credits
        if (user.credits < 50) {
            return res.status(400).json({ message: "Not enough credits to deduct" });
        }

        user.credits -= 50;
        await user.save();

        return res.status(200).json({
            message: "50 credits deducted successfully",
            deducted: 50,
            remainingCredits: user.credits,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
