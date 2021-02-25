const router = require("express").Router();

// Status

router.get("/", (req, res) => {
  return res.status(200).send("Ok");
});

// Routes
const profileRoutes = require("./routes/profile.routes");

router.use("/profile", profileRoutes);

// Export

module.exports = router;
