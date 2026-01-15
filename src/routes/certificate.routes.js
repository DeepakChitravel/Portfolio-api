import express from "express";
import Certificate from "../models/certificate.model.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* ================= PUBLIC ================= */
// Get visible certificates (portfolio)
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find({ visible: true }).sort({
      pinned: -1,
      issueDate: -1,
    });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch certificates" });
  }
});

/* ================= ADMIN ================= */

// Create certificate
router.post("/", auth, async (req, res) => {
  try {
    const cert = await Certificate.create(req.body);
    res.status(201).json(cert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update certificate
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete certificate
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Certificate.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.json({ message: "Certificate deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Toggle pin
router.patch("/:id/pin", auth, async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    cert.pinned = !cert.pinned;
    await cert.save();

    res.json(cert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
