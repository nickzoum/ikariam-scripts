var express = require("express");
var app = express();
var port = process.env.PORT;

app.use(express.static("scripts"));
app.use(express.static("styles"));

app.get("/", function (request, response) {
    response.send("<h1>Test Home Page</h1>");
});

app.listen(port || 3000, function () {
    console.log("Server is running");
});