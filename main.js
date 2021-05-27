var express = require("express");
var app = express();

app.use('/scripts', express.static('scripts'));
app.use('/styles', express.static('styles'));

app.get("/", function (request, response) {
    response.send("<h1>Test Home Page</h1>");
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Server is running, port: " + port);
});