import express from "express";
import { createComment } from "../controllers/postController";

const apiRouter = express.Router();

apiRouter.post("/posts/:id/comment", createComment);

export default apiRouter;