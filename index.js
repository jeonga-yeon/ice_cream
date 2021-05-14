const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`)
}

app.listen(5000, handleListening);