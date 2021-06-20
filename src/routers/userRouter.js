import express from "express";
import { editProfile, remove, logout, changePassword, profile } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit-profile", editProfile);
userRouter.get("/remove-user", remove);
userRouter.get("/:id", profile);
userRouter.get("/:id/change-password", changePassword);

export default userRouter;