const express = require("express");
const router = express.Router();
const User = require("../controllers/User");
const Activity = require("../controllers/Activity");
const auth = require("../controllers/auth");

router.get("/user", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = new User();
    const result = await user.getUser(userId, req.body);
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
  const userId = req.user.id;
  try {
    const editUser = new User();
    const result = await editUser.updateUser(userId, req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/user/delete", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const disableUser = new User();
    const result = await disableUser.disableUser(userId,req.body);
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/activity", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = new Activity();
    const result = await user.getActivity({ email: userId });
    // console.log(result)
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/activity/add", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = new Activity();
    const result = await user.addActivity(userId,req.body);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/activity/update", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = new Activity();
    const result = await user.editActivity(userId,req.body);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/activity/delete", auth, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = new Activity();
    const result = await user.delActivity(userId,req.body);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
