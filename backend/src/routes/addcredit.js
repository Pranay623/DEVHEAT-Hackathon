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

export default router;
