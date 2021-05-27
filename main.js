var express = require("express");
var app = express();

app.use(express.static("scripts"));
app.use(express.static("styles"));

app.get("/", function (request, response) {
    response.send("<h1>Test Home Page</h1>");
});

console.log(process.env.PORT);
console.log(process.env.port);

var port = process.env.PORT;

app.listen(port, function () {
    console.log("Server is running port: " + port);
});