import "./db";
import "./models/Post";
import "./models/User";
import app from "./server";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const handleListening = () => console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);