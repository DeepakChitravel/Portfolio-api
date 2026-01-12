import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    role: { type: String },
    shortIntro: { type: String },
    bio: { type: String },
    skills: [{ type: String }],
    avatar: { type: String },
    location: { type: String },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
