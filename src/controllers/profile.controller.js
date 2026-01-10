import Profile from "../models/Profile.js";

/* GET PROFILE */
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* CREATE or UPDATE PROFILE */
export const saveProfile = async (req, res) => {
  try {
    console.log("🟢 PROFILE BODY:", req.body);

    const profile = await Profile.findOneAndUpdate(
      {},              // single profile
      req.body,        // JSON from frontend
      { new: true, upsert: true }
    );

    res.json(profile);
  } catch (err) {
    console.error("🔴 PROFILE SAVE ERROR:", err);
    res.status(500).json({ message: "Profile save failed" });
  }
};
