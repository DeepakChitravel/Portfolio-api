import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import projectRoutes from "./routes/project.routes.js";
import educationRoutes from "./routes/education.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/experiences", experienceRoutes);
app.use("/api/contact", contactRoutes);
  
// ✅ STATIC FILES (THIS FIXES YOUR ISSUE)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
