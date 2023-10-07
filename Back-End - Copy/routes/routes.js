const express = require("express");
const router = express.Router();
const User = require("../controllers/User");
const Activity = require("../controllers/Activity");

router.get("/user", async (req, res) => {
  try {
    const user = new User();
    const result = await user.getUser(req.body);
    console.log([[[result]]]) 
    res.json([[[result]]]);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.get("/user", async (req, res) => {
//   try {
//     res.send("Hello AUY lnwza");
//   } catch (error) {
//     console.error("Error fetching data from MongoDB", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/user", async (req, res) => {
  try {
    res.send("Hello AUY lnwza");
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/user", async (req, res) => {
  try {
    res.send("Hello AUY lnwza");
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/user", async (req, res) => {
  try {
    res.send("Hello AUY lnwza");
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/activity", async (req, res) => {
  try {
    const user = new Activity();
    const result = await user.getActivity(req.body);
    // console.log(result)
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.post("/activity", async (req, res) => {
  try {
    const user = new Activity();
    const result = await user.addActivity(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
})



module.exports = router;
