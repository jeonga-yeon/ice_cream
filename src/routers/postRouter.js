import express from "express";
import { postDetail, deletePost, getEditPost, postEditPost, getUpload, postUpload } from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/upload").get(getUpload).post(postUpload);
postRouter.get("/:id", postDetail);
postRouter.route("/:id/edit").get(getEditPost).post(postEditPost);
postRouter.get("/:id/delete", deletePost);

export default postRouter;