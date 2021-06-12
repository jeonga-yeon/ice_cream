import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import globalRouter from "./routers/globalRouter";
import postRouter from "./routers/postRouter";
import userRouter from "./routers/userRouter";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.set("view engine", "pug");
app.use(morgan("dev"));
app.use("/", globalRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);