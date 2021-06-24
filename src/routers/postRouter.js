import express from "express";
import { postDetail, getEditPost, postEditPost, getUpload, postUpload, deletePost } from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/upload").get(getUpload).post(postUpload);
postRouter.get("/:id", postDetail);
postRouter.route("/:id/edit").get(getEditPost).post(postEditPost);
postRouter.route("/:id/delete").get(deletePost);

export default postRouter;