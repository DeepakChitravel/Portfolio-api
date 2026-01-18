import express from "express";
import auth from "../middleware/auth.js";
import {
  getProfile,
  saveProfile,
} from "../controllers/profile.controller.js";
import Profile from "../models/profile.model.js"; // ADD THIS

const router = express.Router();

/* ---------------- PUBLIC PROFILE (website) ---------------- */
router.get("/public", async (req, res) => {
  try {
    const profile = await Profile.findOne(); // get first/only profile
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch public profile" });
  }
});

/* ---------------- ADMIN: GET PROFILE ---------------- */
router.get("/", auth, getProfile);

/* ---------------- ADMIN: CREATE / UPDATE PROFILE ---------------- */
router.put("/", auth, saveProfile);

export default router;
