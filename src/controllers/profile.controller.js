import Profile from "../models/profile.model.js";

/* ============================================================
   GET PROFILE (ADMIN - Protected)
============================================================ */
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    res.status(200).json(profile || {});
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* ============================================================
   CREATE or UPDATE PROFILE (ADMIN - Protected)
============================================================ */
export const saveProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = req.body;

    let profile = await Profile.findOne({ user: userId });

    // Update existing profile
    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: userId },
        data,
        { new: true }
      );
      return res.json(profile);
    }

    // Create new profile
    data.user = userId;
    const newProfile = await Profile.create(data);
    res.json(newProfile);

  } catch (err) {
    console.error("PROFILE SAVE ERROR:", err);
    res.status(500).json({ message: "Failed to save profile" });
  }
};

/* ============================================================
   PUBLIC PROFILE (Shown in Portfolio Website)
============================================================ */
export const getPublicProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne().select(
      "name role shortIntro bio skills avatar email location resume"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error("PUBLIC PROFILE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch public profile" });
  }
};
