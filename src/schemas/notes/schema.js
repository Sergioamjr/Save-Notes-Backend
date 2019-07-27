var mongoose = require("mongoose");

const notesModel = {
  titulo: { type: String, required: true },
  data: { type: String, required: true },
  date: { type: Date, required: true },
  userID: { type: String, required: true },
  lastModification: { type: Date, required: true }
};

const notesSchema = mongoose.Schema(notesModel);

module.exports = mongoose.model("Notes", notesSchema);
