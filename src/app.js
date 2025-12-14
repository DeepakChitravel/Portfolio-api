import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

// ✅ middleware FIRST
app.use(cors());
app.use(express.json());

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);

// test
app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
