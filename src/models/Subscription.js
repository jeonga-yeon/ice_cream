import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  subscriptionDate: { type: Date, default: Date.now, required: true },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
