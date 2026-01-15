import Profile from "../models/Profile.js";

/* ---------------- GET PROFILE ---------------- */
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.status(200).json(profile || {});
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* ---------------- CREATE or UPDATE PROFILE ---------------- */
export const saveProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },              // 🔥 match logged-in user
      { ...req.body, user: req.user.id }, // 🔥 attach user
      { new: true, upsert: true }
    );

    res.status(200).json(profile);
  } catch (err) {
    console.error("SAVE PROFILE ERROR:", err);
    res.status(500).json({ message: "Profile save failed" });
  }
};
