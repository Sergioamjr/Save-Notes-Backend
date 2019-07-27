const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "x-auth"],
  optionsSuccessStatus: 200
};

module.exports = corsOptions;