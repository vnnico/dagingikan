import mongoose from "mongoose";
import User from "../models/user.js";
import Fish from "../models/fish.js";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fish",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Fish = mongoose.model("Fish", cartSchema);
export default Fish;
