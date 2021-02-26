const routes = require("express").Router();
const services = require("../services/profile.services");
const { safeAsync } = require("../services/utils");

// Status

routes.get("/", (req, res) => {
  return res.status(200).send("Ok");
});

// Routes

routes.get("/:region/:nick", async (req, res) => {
  return await safeAsync(res, async () => {
    return res.json(
      await services.getByNick(req.params.region, req.params.nick)
    );
  });
});

routes.get("/:region/:summonerId/leagues", async (req, res) => {
  return await safeAsync(res, async () => {
    return res.json(
      await services.getLeagues(req.params.region, req.params.summonerId)
    );
  });
});

routes.get("/:region/:accountId/matches", async (req, res) => {
  return await safeAsync(res, async () => {
    return res.json(
      await services.getMatches(req.params.region, req.params.accountId)
    );
  });
});

module.exports = routes;
