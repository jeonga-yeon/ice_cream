import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String }],
    meta: {
     views: { type: Number, default: 0, required: true },
     like: { type: Number, default: 0, required: true },
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;