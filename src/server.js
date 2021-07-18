import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import postRouter from "./routers/postRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middleware";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "Hello!",
        resave: true,
        saveUninitialized: true,
    })
);

app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions);
        next();
    });
});

app.use(localsMiddleware)
app.use("/", globalRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

export default app;