import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength:30, trim: true },
    fileUrl: { type: String, required: true },
    content: { type: String, required: true, maxLength: 140, trim: true },
    creationDate: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true }],
    meta: {
     views: { type: Number, default: 0, required: true },
     like: { type: Number, default: 0, required: true },
    },
});

postSchema.static("handleHashtags", function(hashtags) {
    return hashtags.split(" ");
});

const Post = mongoose.model("Post", postSchema);

export default Post;