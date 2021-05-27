var express = require("express");
var app = express();

app.use(express.static("scripts"));
app.use(express.static("styles"));

app.get("/", function (request, response) {
    response.send("<h1>Test Home Page</h1>");
});

console.log(process.env.PORT);
console.log(process.env.port);

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running");
});