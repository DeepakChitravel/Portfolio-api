import express from "express";
import Project from "../models/Project.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  auth,
  upload.single("image"), // 🚨 REQUIRED
  async (req, res) => {
    try {
      console.log("USER:", req.user);
      console.log("FILE:", req.file);
      console.log("BODY:", req.body);

      const project = await Project.create({
        title: req.body.title,
        year: req.body.year,
        shortIntro: req.body.shortIntro,
        description: req.body.description,
        image: req.file?.path || "", // ✅ Cloudinary URL
        technologies: JSON.parse(req.body.technologies || "[]"),
        featured: req.body.featured === "true",
        visible: req.body.visible !== "false",
      });

      res.json(project);
    } catch (err) {
      console.error("PROJECT SAVE ERROR:", err);
      res.status(500).json({ message: "Project save failed" });
    }
  }
);

export default router;
