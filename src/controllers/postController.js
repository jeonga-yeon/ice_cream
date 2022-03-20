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
    const post = await Post.findById(id).populate("owner").populate({
        path: "comments",
        populate: {
            path: "owner",
            model: "User",
        },
    });
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
    const isHeroku = process.env.NODE_ENV === "production";
    const post = await Post.findById(id);
    if(!post) {
        return res.status(404).render("notfound", { pageTitle: "포스트를 찾을 수 없음" });
    }
    if(String(post.owner) !== String(_id)) {
        return res.status(403).redirect("/");
    }
    const videoFiles = req.files["videos"];
    const imageFiles = req.files["images"];
    let videosUrl = [];
    let imagesUrl = [];
    if(videoFiles) {
        for(let i = 0; i < videoFiles.length; i++) {
            isHeroku ? videosUrl.push(videoFiles[i].location) : videosUrl.push("/"+videoFiles[i].path)
        }
    }
    if(imageFiles) {
        for(let i = 0; i < imageFiles.length; i++) {
            isHeroku ? imagesUrl.push(imageFiles[i].location) : imagesUrl.push("/"+imageFiles[i].path)
        }
    }
    await Post.findByIdAndUpdate(id, {
        title, 
        content, 
        videosUrl,
        imagesUrl,
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
    const isHeroku = process.env.NODE_ENV === "production";
    let videosUrl = [];
    let imagesUrl = [];
    if(videoFiles) {
        for(let i = 0; i < videoFiles.length; i++) {
            isHeroku ? videosUrl.push(videoFiles[i].location) : videosUrl.push("/"+videoFiles[i].path)
        }
    }
    if(imageFiles) {
        for(let i = 0; i < imageFiles.length; i++) {
            isHeroku ? imagesUrl.push(imageFiles[i].location) : imagesUrl.push("/"+imageFiles[i].path)
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

    const comments = await Comment.find({
        post: id,
    });
    await Comment.deleteMany({
        post: id,
    });
    for(let i = 0; i < comments.length; i++) {
        const commentOwner = await User.findById(comments[i].owner);
        commentOwner.comments.splice(commentOwner.comments.indexOf(comments[i]._id), 1);
        commentOwner.update();
    }

    const bookmarks = await Bookmark.find({
        post: id,
    });
    await Bookmark.deleteMany({
        post: id,
    });
    for(let i = 0; i < bookmarks.length; i++) {
        const bookmarkOwner = await User.findById(bookmarks[i].owner);
        bookmarkOwner.bookmarks.splice(bookmarkOwner.bookmarks.indexOf(bookmarks[i]._id), 1);
        bookmarkOwner.update();
    }

    await Post.findByIdAndDelete(id);

    const user = await User.findById(_id);
    user.posts.splice(user.posts.indexOf(id), 1);
    user.update();

    return res.redirect("/");
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    let posts = [];
    if(keyword) {
        if((keyword[0] !== "#") || (keyword === "#")) {
            posts = await Post.find({
                title: {
                    $regex: new RegExp(keyword, "i")
                },
            }).sort({ creationDate: "desc" }).populate("owner");
        }
        if((posts.length === 0) && (keyword !== "#")) {
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

    const thisComment = await Comment.findById(comment._id).populate("owner");

    return res.status(201).json({
        newCommentId: comment._id,
        newCommentAvatar: thisComment.owner.avatarUrl,
        newCommentOwner: comment.owner._id,
        newCommentNickname: thisComment.owner.nickname,
        newCommentDate: thisComment.creationDate
    });
};

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    const { user: {_id} } = req.session;
    const comment = await Comment.findById(id);
    const commentOwner = await User.findById(comment.owner);
    const commentedPost = await Post.findById(comment.post);

    if(String(comment.owner) !== String(_id)) {
        return res.sendStatus(404);
    }

    await Comment.findByIdAndDelete(id);
    commentOwner.comments.splice(commentOwner.comments.indexOf(id), 1);
    commentOwner.save();
    commentedPost.comments.splice(commentedPost.comments.indexOf(id), 1);
    commentedPost.save();

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

    const bookmarkOwner = await User.findById(bookmark[0].owner); 

    if(String(bookmark[0].owner._id) !== String(_id)) {
        return res.sendStatus(404);
    }

    await Bookmark.findOneAndDelete({
        post: id,
        owner: _id,
    }); 

    bookmarkOwner.bookmarks.splice(bookmarkOwner.bookmarks.indexOf(bookmark[0]._id), 1);
    bookmarkOwner.save();

    return res.sendStatus(201);
}