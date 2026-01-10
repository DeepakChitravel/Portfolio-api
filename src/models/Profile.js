import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    role: String,
    shortIntro: String,
    bio: String,
    skills: { type: [String], default: [] },
    avatar: String,
    email: { type: String, required: true },
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
