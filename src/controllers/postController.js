import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";
import Bookmark from "../models/Bookmark";

export const home = async (req, res) => {
    const posts = await Post.find({}).sort({ creationDate: "desc" }).populate("owner");
    return res.render("home", { pageTitle: "Ice Cream", posts});
};

export const postDetail = async (req, res) => {
    const { id } = req.params;
    const { user } = req.session;
    const post = await Post.findById(id).populate("owner").populate("comments");
    if(!post) {
        return res.render("notfound", { pageTitle: "포스트를 찾을 수 없음" });
    }
    post.meta.views = post.meta.views + 1;
    await post.save();
    const userBookmarks = [];
    if(user === undefined) {
        return res.render("postdetail", { pageTitle: `포스트: ${post.title}`, post });
    } else {
        const thisUser = await User.findById(user._id).populate("bookmarks").populate("posts");
        for(let i = 0; i < thisUser.bookmarks.length; i++) {
            const jsonStr = JSON.stringify(thisUser.bookmarks[i].post);
            const jsonParse = JSON.parse(jsonStr);
            userBookmarks.push(jsonParse);
        }
        return res.render("postdetail", { pageTitle: `포스트: ${post.title}`, post, userBookmarks });
    }
};

export const getEditPost = async (req, res) => {
    const { id } = req.params;
    const { user: {_id} } = req.session;
    const post = await Post.findById(id);
    if(!post) {
        return res.status(404).render("notfound", { pageTitle: "포스트를 찾을 수 없음" });
    }
    if(String(post.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    return res.render("editpost", { pageTitle: `수정: ${post.title}`, post });
};

export const postEditPost = async (req, res) => {
    const { user: {_id} } = req.session;
    const { id } = req.params;
    const { title, content, hashtags } = req.body;
    const post = await Post.exists({ _id: id });
    if(!post) {
        return res.status(404).render("notfound", { pageTitle: "포스트를 찾을 수 없음" });
    }
    if(String(post.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    await Post.findByIdAndUpdate(id, {
        title, 
        content, 
        hashtags: Post.handleHashtags(hashtags),
    });
    return res.redirect(`/posts/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "포스트 업로드" });
};

export const postUpload = async (req, res) => {
    const { 
        user: { _id },
     } = req.session;
    const videoFiles = req.files["videos"];
    const imageFiles = req.files["images"];
    const { title, content, hashtags } = req.body;
    let videosUrl = [];
    let imagesUrl = [];
    if(videoFiles) {
        for(let i = 0; i < videoFiles.length; i++) {
            videosUrl.push(`/${videoFiles[i].path}`)
        }
    }
    if(imageFiles) {
        for(let i = 0; i < imageFiles.length; i++) {
            imagesUrl.push(`/${imageFiles[i].path}`)
        }
    }
    try {
        const newPost = await Post.create({
            title,
            content,
            videosUrl,
            imagesUrl,
            owner: _id,
            hashtags: Post.handleHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.posts.push(newPost._id);
        user.save();
        return res.redirect("/");
    } catch(error) {
        return res.status(400).render("upload", { 
            pageTitle: "포스트 업로드",
            errorMessage: error._message,
         });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const { user: {_id} } = req.session;
    const post = await Post.findById(id);
    if(!post) {
        return res.status(404).render("notfound", { pageTitle: "포스트를 찾을 수 없음" });
    }
    if(String(post.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    for(let i = 0; i < post.comments.length; i++) {
        await Comment.findByIdAndDelete(post.comments[i]);
    }
    const bookmarks = await Bookmark.find({
        post: id,
    });
    for(let i = 0; i < bookmarks.length; i++) {
        await Bookmark.deleteMany({
            post: id,
        });
    }
    await Post.findByIdAndDelete(id);
    return res.redirect("/");
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    let posts = [];
    if(keyword) {
        posts = await Post.find({
            title: {
                $regex: new RegExp(keyword, "i")
            },
        }).sort({ creationDate: "desc" }).populate("owner");
        if(posts.length === 0) {
            posts = await Post.find({
                hashtags: {
                    $regex: keyword,
                    $options: "i",
                },
            }).sort({ creationDate: "desc" }).populate("owner");
        }
    }
    return res.render("search", { pageTitle: "검색", posts});
};

export const createComment = async (req, res) => {
    const {
        session: { user },
        body: { text },
        params: { id },
    } = req;
    
    const post = await Post.findById(id);
    const thisUser = await User.findById(user._id);

    if(!post) {
        return res.sendStatus(404);
    }

    if(!thisUser) {
        return res.sendStatus(404);
    }

    const comment = await Comment.create({
        text,
        owner: user._id,
        post: id,
    });

    post.comments.push(comment._id);
    post.save();
    thisUser.comments.push(comment._id);
    thisUser.save();

    return res.status(201).json({
        newCommentId: comment._id
    });
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    const { user: {_id} } = req.session;
    const comment = await Comment.findById(id);
    if(String(comment.owner) !== String(_id)) {
        return res.sendStatus(404);
    }
    await Comment.findByIdAndDelete(id);
    return res.sendStatus(201);
};

export const bookmark = async (req, res) => {
    const {
        session: { user },
        params: { id },
    } = req;
    
    const post = await Post.findById(id);
    const thisUser = await User.findById(user._id);

    if(!post) {
        return res.sendStatus(404);
    }

    if(!thisUser) {
        return res.sendStatus(404);
    }

    const bookmark = await Bookmark.create({
        post: id,
        owner: user._id,
    });

    thisUser.bookmarks.push(bookmark.id);
    thisUser.save();

    return res.sendStatus(201);
}

export const deleteBookmark = async (req, res) => {
    const { id } = req.params;
    const { user: {_id} } = req.session;
    const bookmark = await Bookmark.find({
        post: id,
        owner: _id,
    });
    if(String(bookmark[0].owner) !== String(_id)) {
        return res.sendStatus(404);
    }
    await Bookmark.findOneAndDelete({
        post: id,
        owner: _id,
    }); 
    return res.sendStatus(201);
}