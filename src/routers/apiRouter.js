import express from "express";
import { createComment, deleteComment } from "../controllers/postController";

const apiRouter = express.Router();

apiRouter.post("/posts/:id/comment", createComment);
apiRouter.delete("/comments/:id", deleteComment);

export default apiRouter;