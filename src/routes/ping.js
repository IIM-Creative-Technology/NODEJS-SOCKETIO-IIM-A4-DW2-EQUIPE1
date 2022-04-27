const express = require("express");
const router = express.Router();

router.get("/api/ping", (req, res) => {
  res.send("API is up and running!");
});

module.exports = router;