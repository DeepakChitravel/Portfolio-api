import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

// STORAGE SETTINGS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resumes"); // folder to store PDFs
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

// FILE FILTER (PDF ONLY)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// UPLOAD ROUTE
router.post("/resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Return file URL
  res.json({
    url: `/uploads/resumes/${req.file.filename}`
  });
});

export default router;
