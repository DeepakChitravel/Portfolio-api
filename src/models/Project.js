import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    year: String,
    date: String,
    shortIntro: String,
    description: String,
    image: String,
    technologies: [String],
    role: String,
    category: String,
    githubUrl: String,
    liveUrl: String,
    featured: Boolean,
    visible: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
