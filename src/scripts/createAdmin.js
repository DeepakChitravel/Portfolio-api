import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@gmail.com";
    const password = "admin123";

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashed,
    });

    console.log("✅ Admin user created");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
