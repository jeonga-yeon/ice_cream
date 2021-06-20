import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import postRouter from "./routers/postRouter";
import userRouter from "./routers/userRouter";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

export default app;