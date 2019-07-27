var server = require("./server");
const PORT = process.env.PORT || 3001;

server.listen(PORT, err => {
  /*eslint-disable*/
  console.log(
    err ? `Error on build server ${err}` : `Server is running on port ${PORT}`
  );
  /*eslint-enable*/
});

module.exports = server;
