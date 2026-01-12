import express from "express";
import auth from "../middleware/auth.js";
import Project from "../models/Project.js";

const router = express.Router();

/* ---------------- GET ALL PROJECTS ---------------- */
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (err) {
    console.error("GET PROJECTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

/* ---------------- ADD PROJECT ---------------- */
router.post("/", auth, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("ADD PROJECT ERROR:", err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
