var server = require("express")();
var bodyParser = require("body-parser");
var cors = require("cors");
var corsOptions = require("./cors");

var {
  AddNote,
  ListNote,
  ListAllNotes,
  DeleteNote,
  UpdateNote
} = require("./../schemas");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors(corsOptions));

server.get("/starter", (req, res) => {
  res.json({ ok: 1 });
});

server.post("/add-note", AddNote);
server.get("/list-note", ListNote);
server.get("/list-all-notes", ListAllNotes);
server.delete("/delete-note", DeleteNote);
server.patch("/update-note", UpdateNote);

module.exports = server;
