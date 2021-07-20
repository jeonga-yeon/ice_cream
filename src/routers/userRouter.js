import express from "express";
import { logout, profile, getEditProfile, postEditProfile, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectorMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit-profile").all(protectorMiddleware).get(getEditProfile).post(postEditProfile);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", profile);

export default userRouter;