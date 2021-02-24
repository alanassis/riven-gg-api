const router = require("express").Router();

// Status

router.get("/", (req, res) => {
  return res.status(200).send("Ok");
});

// Routes
const profileRoutes = require("./routes/profile.routes");
const leagueRoutes = require("./routes/league.routes");

router.use("/profile", profileRoutes);
router.use("/league", leagueRoutes);

// Export

module.exports = router;
