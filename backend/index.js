import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import app from "./app.js";
import connectDB from "./src/db/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("Server up and running");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is listening at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MONGODB connection failed:", err);
  });
