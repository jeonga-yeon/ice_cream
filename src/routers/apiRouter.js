import express from "express";
import {
  bookmark,
  createComment,
  deleteBookmark,
  deleteComment,
} from "../controllers/postController";
import {
  deleteProfileImg,
  deleteSubscription,
  deleteUser,
  subscription,
} from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post("/posts/:id/comment", createComment);
apiRouter.delete("/comments/:id", deleteComment);
apiRouter.post("/posts/:id/bookmark", bookmark);
apiRouter.delete("/bookmarks/:id", deleteBookmark);
apiRouter.post("/users/:id/subscription", subscription);
apiRouter.delete("/subscriptions/:id", deleteSubscription);
apiRouter.delete("/users/:id/user-delete", deleteUser);
apiRouter.delete("/users/:id/profile-image", deleteProfileImg);

export default apiRouter;
