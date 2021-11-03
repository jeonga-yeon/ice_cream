import Post from "../models/Post";
import User from "../models/User";

export const home = async (req, res) => {
    const posts = await Post.find({}).sort({ creationDate: "desc" });
    return res.render("home", { pageTitle: "Ice Cream", posts});
};

export const postDetail = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate("owner");
    if(!post) {
        return res.render("notfound", { pageTitle: "포스트를 찾을 수 없음" });
    }
    return res.render("postdetail", { pageTitle: `포스트: ${post.title}`, post });
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
        });
    }
    return res.render("search", { pageTitle: "검색", posts});
};
