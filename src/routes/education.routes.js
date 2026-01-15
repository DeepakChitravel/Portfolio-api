import express from "express";
import Education from "../models/education.model.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* ========= PUBLIC ========= */
router.get("/", async (req, res) => {
  try {
    const data = await Education.find({ visible: true }).sort({
      startYear: -1,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch education" });
  }
});

/* ========= ADMIN ========= */
router.post("/", auth, async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json(edu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: "Education deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
