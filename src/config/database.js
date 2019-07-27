var mongoose = require("mongoose");
const localDB = "mongodb://localhost/mynotesdb";

const url = process.env.MONGODB_URI || localDB;

module.exports = mongoose.connect(url, { useNewUrlParser: true });
