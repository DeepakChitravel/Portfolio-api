import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    name: String,
    role: String,
    shortIntro: String,
    bio: String,
    skills: [String],
    avatar: String,
    email: String,
    location: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", ProfileSchema);
