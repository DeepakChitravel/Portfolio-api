import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    credentialId: {
      type: String,
    },
    credentialUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    skills: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ["Technical", "Professional", "Academic", "Language", "Other"],
      default: "Technical",
    },
    image: {
      type: String, // Cloudinary URL
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);
