const { route } = require("./app");

const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("Hello World =D");
});

module.exports = routes;
