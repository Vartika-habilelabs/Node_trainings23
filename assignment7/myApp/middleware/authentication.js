const jwt = require("jsonwebtoken");
const env = require("dotenv");
const User = require("../db/schemas/userSchema");

env.config();
const authorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(422).send("You must be logged in");
  } else {
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.SECRETKEY, async (err, payload) => {
      if (err) return res.status(422).send("You must be logged in");
      const { _id } = payload;
      const userdata = await User.findById({ _id });
      req.user=userdata?userdata:null
      next();
    });
  }
};
module.exports = authorization;
