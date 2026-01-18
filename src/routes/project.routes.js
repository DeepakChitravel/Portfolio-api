import express from "express";
import auth from "../middleware/auth.js";
import Project from "../models/Project.js";

const router = express.Router();

/* -------- GET PROJECTS -------- */
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

/* -------- ADD PROJECT -------- */
router.post("/", auth, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("PROJECT SAVE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* -------- UPDATE PROJECT -------- */
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (err) {
    console.error("PROJECT UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

/* -------- DELETE PROJECT -------- */
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedProject = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      id: req.params.id,
    });
  } catch (err) {
    console.error("PROJECT DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


/* -------- PUBLIC: GET VISIBLE PROJECTS (Portfolio Website) -------- */
router.get("/public", async (req, res) => {
  try {
    const projects = await Project.find({ visible: true })
      .sort({ createdAt: -1 })
      .select("-user"); // hide user field

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch public projects" });
  }
});

export default router;
