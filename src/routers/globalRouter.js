import express from "express";
import { getJoin, login, postJoin } from "../controllers/userController";
import { home, search } from "../controllers/postController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;