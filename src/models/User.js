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
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;