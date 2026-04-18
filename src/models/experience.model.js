import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: String,
    type: {
      type: String,
      enum: ["Work", "Project"],
      default: "Work",
    },
    category: String,
    organization: String,
    role: String,
    location: String,
    locationType: String,

    startDate: String,
    endDate: String,
    current: Boolean,

    description: String,
    achievements: [String],
    technologies: [String],

    image: String,
    link: String,
    githubUrl: String,

    featured: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", experienceSchema);