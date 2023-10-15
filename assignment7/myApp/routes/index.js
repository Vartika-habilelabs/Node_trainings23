const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authentication");
const { signup, login } = require("../controller/userController");

router.get("/", (req, res) => {
  res.render("index", { title: "Welcome", port: process.env.PORT });
});

router.post("/signup", signup);

router.post("/login", login);

router.get("/protected", authorization, (req, res) => {
  res.send("hi");
});
module.exports = router;
