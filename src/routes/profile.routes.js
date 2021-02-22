const routes = require("express").Router();
const services = require("../services/profile.services");
const { safeAsync } = require("../services/utils");

// Status

routes.get("/", (req, res) => {
  return res.status(200).send("Ok");
});

// Routes

routes.get("/:nick", async (req, res) => {
  return await safeAsync(res, async () => {
    return res.json(await services.getByNick(req.params.nick));
  });
});

module.exports = routes;
