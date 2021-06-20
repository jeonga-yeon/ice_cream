import express from "express";
import { postDetail, deletePost, getEditPost, postEditPost, getUpload, postUpload } from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/:id(\\d+)", postDetail);
postRouter.route("/:id(\\d+)/edit").get(getEditPost).post(postEditPost);
postRouter.get("/:id(\\d+)/delete", deletePost);
postRouter.route("/upload").get(getUpload).post(postUpload);

export default postRouter;