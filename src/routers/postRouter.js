import express from "express";
import { postDetail, editPost, upload, deletePost } from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/:id(\\d+)", postDetail);
postRouter.get("/:id(\\d+)/edit", editPost);
postRouter.get("/:id(\\d+)/delete", deletePost);
postRouter.get("/upload", upload);

export default postRouter;