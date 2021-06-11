import express from "express";
import { editProfile, remove, logout, userDetail, changePassword } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit-profile", editProfile);
userRouter.get("/remove-user", remove);
userRouter.get("/:id", userDetail);
userRouter.get("/:id/change-password", changePassword);

export default userRouter;