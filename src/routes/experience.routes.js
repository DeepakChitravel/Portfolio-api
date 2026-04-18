import express from "express";
import Experience from "../models/experience.model.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* GET */
router.get("/", async (req, res) => {
  try {
    const data = await Experience.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching" });
  }
});

/* POST */
router.post("/", auth, async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.json(exp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* PUT */
router.put("/:id", auth, async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(exp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* DELETE */
router.delete("/:id", auth, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;