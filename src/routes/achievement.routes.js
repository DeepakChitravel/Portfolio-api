import express from "express";
import Achievement from "../models/Achievement.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* ================= PUBLIC ================= */

// GET all achievements (public portfolio)
router.get("/", async (req, res) => {
  try {
    const data = await Achievement.find().sort({ year: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch achievements" });
  }
});

/* ================= ADMIN ================= */

// ADD achievement
router.post("/", auth, async (req, res) => {
  try {
    const item = await Achievement.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ UPDATE achievement (THIS FIXES YOUR 404)
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ DELETE achievement
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Achievement.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Achievement not found" });
    }

    res.json({ message: "Achievement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
