import "dotenv/config";
import "./db";
import "./models/Post";
import "./models/User";
import app from "./server";

const PORT = process.env.PORT;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);