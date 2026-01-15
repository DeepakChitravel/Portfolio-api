import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    fieldOfStudy: String,
    location: String,
    startYear: { type: String, required: true },
    endYear: String,
    current: { type: Boolean, default: false },
    grade: String,
    description: String,
    activities: String,
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
