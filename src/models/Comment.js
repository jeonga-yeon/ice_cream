import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now, required: true },
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
