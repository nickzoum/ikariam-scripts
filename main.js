const express = require("express");
const app = express();
const port = 80;

app.get("/", (request, response) => {
    res.send("Test Home Page");
});

app.use(express.static("scripts"));
app.use(express.static("styles"));

app.listen(port, () => {
    console.log("Server is running");
});