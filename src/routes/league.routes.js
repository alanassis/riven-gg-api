const routes = require("express").Router();
const services = require("../services/league.services");
const { safeAsync } = require("../services/utils");

// Status

routes.get("/", (req, res) => {
  return res.status(200).send("Ok");
});

// Routes

routes.get("/:region/:summonerId", async (req, res) => {
  return await safeAsync(res, async () => {
    return res.json(
      await services.getById(req.params.region, req.params.summonerId)
    );
  });
});

module.exports = routes;
