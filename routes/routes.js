const express = require("express");
const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    res.send("Hello AUY lnwza");
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
