import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: { type: String, required: true },
    year: String,
    shortIntro: String,
    description: String,
    image: String,
    technologies: [String],
    role: String,
    category: String,
    githubUrl: String,
    liveUrl: String,
    featured: { type: Boolean, default: false },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
