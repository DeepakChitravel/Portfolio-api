import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import projectRoutes from "./routes/project.routes.js";
import educationRoutes from "./routes/education.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://panel-portfolio.netlify.app",
      "https://697657e4f8d852654a897a59--panel-portfolio.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/educations", educationRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/upload", uploadRoutes);

// ✅ STATIC FILES (THIS FIXES YOUR ISSUE)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
