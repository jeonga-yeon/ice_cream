import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    creationDate: Date,
    hashtags: [{ type: String }],
    meta: {
     views: Number,
     like: Number,
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;