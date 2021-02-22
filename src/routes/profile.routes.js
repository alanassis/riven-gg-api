const routes = require("express").Router();
const services = require("../services/profile.services");

// Status

routes.get("/", (req, res) => {
  return res.status(200).send("Ok");
});

module.exports = routes;
