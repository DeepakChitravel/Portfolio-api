import express from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* GET ALL PROJECTS */
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

/* CREATE PROJECT */
router.post(
  "/",
  auth,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("🟢 BODY:", req.body);
      console.log("🖼 FILE:", req.file);

      const project = await Project.create({
        ...req.body,
        image: req.file?.path || "",
      });

      res.json(project);
    } catch (err) {
      console.error("🔴 SAVE ERROR:", err);
      res.status(500).json({ message: "Project save failed" });
    }
  }
);

export default router;
