import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  year: Number,
});

export default mongoose.model("Achievement", achievementSchema);
