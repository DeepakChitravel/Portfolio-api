import express from "express";

const router = express.Router();

// ✅ MUST be "/"
router.post("/", async (req, res) => {
  try {
    console.log("📩 Contact Message:", req.body);

    res.json({
      success: true,
      message: "Message received successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to send message"
    });
  }
});

export default router;