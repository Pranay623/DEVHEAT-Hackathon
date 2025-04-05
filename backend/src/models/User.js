import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileCompleted: { 
        type: Boolean, 
        default: false 
    }, 
    jobRole: { 
        type: String 
    }, 
    experience: { 
        type: Number 
    }, 
    targetCompany: { 
        type: String 
    },
    level: { 
        type: String, enum: ["beginner", "intermediate", "advanced"] 
    }, 
    credits: {
        type: Number,
        default: 300,
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
