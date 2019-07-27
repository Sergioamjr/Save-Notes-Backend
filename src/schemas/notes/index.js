var Notes = require("./schema.js");
var _get = require("lodash").get;

const AddNote = (req, res) => {
  const {
    body: { params }
  } = req;
  const newNote = new Notes(params);
  newNote.save((error, doc) => {
    if (error) {
      res
        .status(400)
        .json({ errorMessage: `Não possível salvar nota: ${error}` });
    } else {
      res.json({ response: "Nota criada com sucesso.", document: doc });
    }
  });
};

const ListNote = (req, res) => {
  const {
    query: { _id }
  } = req;

  Notes.findOne({ _id }, (error, notes) => {
    if (error) {
      res.json({ errorMessage: "Não foi possível verificar as notes", error });
    } else {
      res.json({ response: { ...notes } });
    }
  });
};

const ListAllNotes = (req, res) => {
  const {
    query: { _id }
  } = req;

  Notes.find({}, (error, notes) => {
    if (error) {
      res.json({ errorMessage: "Não foi possível verificar as notas", error });
    } else {
      res.json({ response: { ...notes } });
    }
  });
};

const DeleteNote = (req, res) => {
  const {
    query: { _id }
  } = req;

  Notes.findByIdAndRemove({ _id }, error => {
    if (error) {
      res.status(400).json({ errorMessage: "Não foi possível excluir a nota" });
    } else {
      res.json({ response: "Nota excluida com sucesso." });
    }
  });
};

const UpdateNote = (req, res) => {
  const {
    body: { params }
  } = req;
  const { _id } = params;
  Notes.updateOne(
    {
      _id
    },
    params,
    error => {
      if (error) {
        res.status(400).json({
          errorMessage: `Não foi possível atualizar a nota: ${error}`
        });
      } else {
        res.json({ response: "Nota atualizada com sucesso." });
      }
    }
  );
};

module.exports = {
  AddNote,
  ListNote,
  ListAllNotes,
  DeleteNote,
  UpdateNote
};
