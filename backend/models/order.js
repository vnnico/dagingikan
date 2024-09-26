import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  channel: {
    type: String,
    required: true,
    default: "none",
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  amount: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
