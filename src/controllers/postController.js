import Post from "../models/Post";

export const home = (req, res) => {
    Post.find({}, (error, posts) => {
        return res.render("home", { pageTitle: "Ice Cream", posts});
    });
};

export const postDetail = (req, res) => {
    const { id } = req.params;
    return res.render("post", { pageTitle: `포스트` });
};

export const getEditPost = (req, res) => {
    const { id } = req.params;
    return res.render("editpost", { pageTitle: `수정` });
};

export const postEditPost = (req, res) => {
    const { id } = req.params;
    const { title } = req.params;
    return res.redirect(`/posts/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "포스트 업로드" });
};

export const postUpload = (req, res) => {
    const { title } = req.body;
    return res.redirect("/");
};

export const search = (req, res) => res.send("Search");
export const deletePost = (req, res) => res.send("Delete Post")