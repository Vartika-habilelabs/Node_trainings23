const User = require("../db/schemas/userSchema");
const env = require("dotenv");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
env.config();
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
      return res.status(422).send("Please add all the fields");
    const hashPassword = crypto.AES.encrypt(password, process.env.SECRETKEY);
    const user = new User({
      name,
      email,
      password: hashPassword,
    });
    const exists = await User.findOne({ email });
    if (exists) return res.send("User already exists");
    else {
      user.save().then(() => {
        return res.send("User saved successfully");
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send("Please add all the fields");
    const savedUser = await User.findOne({ email });
    if (savedUser) {
      const bytes = crypto.AES.decrypt(
        savedUser.password,
        process.env.SECRETKEY
      );
      var unHashPassword = bytes.toString(crypto.enc.Utf8);

      if (unHashPassword === password) {
        const token = jwt.sign({ _id: savedUser._id }, process.env.SECRETKEY);
        res.send({authToken: token});
      } else {
        return res.status(422).send("Invalid Password");
      }
    } else {
      return res.status(422).send("Invalid email or you can signup instead");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
