import express from "express";
import Achievement from "../models/Achievement.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* PUBLIC (portfolio) */
router.get("/", async (req, res) => {
  const data = await Achievement.find().sort({ year: -1 });
  res.json(data);
});

/* ADMIN (manager panel) */
router.post("/", auth, async (req, res) => {
  const item = await Achievement.create(req.body);
  res.json(item);
});

export default router;
