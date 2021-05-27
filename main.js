var express = require("express");
var app = express();
var port = process.env.port;

app.get("/", function (request, response) {
    response.send("Test Home Page");
});

app.use(express.static("scripts"));
app.use(express.static("styles"));

app.listen(port, function () {
    console.log("Server is running");
});