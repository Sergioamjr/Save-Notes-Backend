var server = require("express")();
var bodyParser = require("body-parser");
var cors = require("cors");
var corsOptions = require("./cors");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors(corsOptions));

server.get("/starter", (req, res) => {
  res.json({ ok: 1 });
});

module.exports = server;
