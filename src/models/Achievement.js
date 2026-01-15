import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "Award",
    },

    issuer: {
      type: String,
    },

    date: {
      type: String, // ISO date string from frontend
      required: true,
    },

    impact: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    visible: {
      type: Boolean,
      default: true,
    },

    link: {
      type: String,
    },

    image: {
      type: String, // ✅ Cloudinary secure_url
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model("Achievement", achievementSchema);
