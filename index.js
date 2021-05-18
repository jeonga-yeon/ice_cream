import express from "express";
const app = express();

require("dotenv").config();
const PORT = process.env.PORT

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('My Home');

const handleProfile = (req, res) => res.send("My Profile");

const between = (req, res, next) => {
    console.log("between");
    next();
}

app.use(between);

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(5000, handleListening);