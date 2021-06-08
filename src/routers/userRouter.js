import express from "express";
import { changePassword, deleteProfile, editProfile, userDetail } from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.deleteProfile, deleteProfile);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;