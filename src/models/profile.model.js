import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Basic Info
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String },
    location: { type: String },

    // Portfolio Info
    shortIntro: { type: String },
    bio: { type: String },
    skills: [{ type: String }],
    avatar: { type: String },

    // 📄 Resume PDF URL
    resume: { type: String },  // ✅ added

  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
