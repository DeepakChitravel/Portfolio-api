import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log("⚡ Login request received");

    // req.body check
    console.log("Request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      console.log("❌ Missing input:", { email, password });
      return res.status(400).json({ message: "Email or password missing" });
    }

    // find user
    const user = await User.findOne({ email });

    console.log("DB lookup result:", user);

    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // password compare
    const ok = await bcrypt.compare(password, user.password);

    console.log("Password match:", ok);

    if (!ok) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("✅ Login success");

    return res.json({ token });

  } catch (err) {
    console.error("🔥 Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/create-admin", async (req, res) => {
  try {
    const existing = await User.findOne({ email: "admin@gmail.com" });
    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      email: "admin@gmail.com",
      password: hashedPassword
    });

    res.json({ message: "Admin created successfully", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
