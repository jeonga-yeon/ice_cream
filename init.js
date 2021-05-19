import app from "./app";

require("dotenv").config();
const PORT = process.env.PORT

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);