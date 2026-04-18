import express from "express";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await sendEmail({ name, email, subject, message });

    res.json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (err) {
    console.error("Contact Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send email"
    });
  }
});

export default router;