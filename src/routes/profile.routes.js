import express from "express";
import auth from "../middleware/auth.js";
import {
  getProfile,
  saveProfile,
} from "../controllers/profile.controller.js";

const router = express.Router();

/* ---------------- GET PROFILE ---------------- */
router.get("/", auth, getProfile);

/* ---------------- CREATE / UPDATE PROFILE ---------------- */
router.post("/", auth, saveProfile);

export default router;
