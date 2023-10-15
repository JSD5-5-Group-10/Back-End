const express = require("express");
const { addACtivityController } = require("../controllers/ActivityControllers");
const router = express.Router();
const User = require("../controllers/User");
const Activity = require("../controllers/Activity");
const auth = require("../controllers/auth");

router.get("/user", async (req, res) => {
  try {
    const user = new User();
    const result = await user.getUser(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const user = new User();
    const result = await user.loginUser(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/user/register", async (req, res) => {
  try {
    const newUser = new User();
    const result = await newUser.registerUser(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/user/update", auth, async (req, res) => {
  try {
    const editUser = new User();
    const result = await editUser.updateUser(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/user/delete", auth, async (req, res) => {
  try {
    const disableUser = new User();
    const result = await disableUser.disableUser(req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/activity", auth, async (req, res) => {
  try {
    const user = new Activity();
    const result = await user.getActivity(req.body);
    // console.log(result)
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/activity/add", auth, async (req, res) => {
  console.log(auth)
  try {
    const user = new Activity();
    const result = await user.addActivity(req.body, req.header);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/activity/update", auth, async (req, res) => {
  try {
    const user = new Activity();
    const result = await user.editActivity(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/activity/delete", auth, async (req, res) => {
  try {
    const user = new Activity();
    const result = await user.delActivity(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//POST || ADD ACTIVITY
router.post("/activity", addACtivityController);

module.exports = router;
