const { LolApi } = require("twisted");
const router = require("express").Router();

// Status

router.get("/", (req, res) => {
  return res.status(200).send("Ok");
});

// Routes
const profileRoutes = require("./routes/profile.routes");

router.use("/profile", profileRoutes);

// Static Route

router.get("/stats", async (req, res) => {
  const lolApi = new LolApi();
  const versions = await lolApi.DataDragon.getVersions();

  return res.json({
    version: versions[0],
  });
});

// Export

module.exports = router;
