import express from "express";
import { bookmark, createComment, deleteBookmark, deleteComment } from "../controllers/postController";

const apiRouter = express.Router();

apiRouter.post("/posts/:id/comment", createComment);
apiRouter.delete("/comments/:id", deleteComment);
apiRouter.post("/posts/:id/bookmark", bookmark);
apiRouter.delete("/bookmarks/:id", deleteBookmark);

export default apiRouter;