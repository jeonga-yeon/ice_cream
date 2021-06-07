import express from "express";
import { home, search } from "../controllers/postController";
import { join, login } from "../controllers/userController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.search, search);

export default globalRouter;