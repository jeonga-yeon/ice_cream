export const home = (req, res) => res.render("home");
export const postDetail = (req, res) => res.render("post", {pageTitle: "포스트"});
export const editPost = (req, res) => res.render("editpost", {pageTitle: "포스트 수정"})
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deletePost = (req, res) => res.send("Delete Post")