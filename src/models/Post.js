import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true, maxLength:30, trim: true },
    videosUrl: [String],
    imagesUrl: [String],
    content: { type: String, required: true, maxLength: 1000, trim: true },
    creationDate: { type: Date, default: Date.now, required: true },
    hashtags: [{ type: String, trim: true }],
    meta: {
     views: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }],
});

postSchema.static("handleHashtags", function(hashtags) {
    return hashtags.split(" ");
});

const Post = mongoose.model("Post", postSchema);

export default Post;