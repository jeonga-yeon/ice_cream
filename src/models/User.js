import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true, unique: true },
  avatarUrl: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  aboutuser: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bookmark" }],
  subscriptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
  ],
  subscribers: { type: Number, default: 0, required: true },
  creationDate: { type: Date, default: Date.now, required: true },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
