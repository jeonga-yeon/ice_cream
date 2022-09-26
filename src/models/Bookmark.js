import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  bookmarkDate: { type: Date, default: Date.now, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Post" },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
