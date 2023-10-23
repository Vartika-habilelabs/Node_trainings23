const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const env = require("dotenv");
const express = require("express");
const app = express();
app.use(express.json());
env.config();
const port = process.env.PORT;
app.use(express.static(__dirname + "/public"));
const session = require("express-session");

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${port}/auth/google/callback`,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(accessToken);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/", (req, res) => {
  res.sendFile("/index.html", { root: __dirname + "/public" });
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/failure",
  })
);

app.get("/failure", (req, res) => {
  console.log("OAuth failed:", req.query.error);
  res.send("OAuth failed. Please check your credentials.");
});
app.get("/profile", (req, res) => {
  res.send(`Welcome, ${req.user.displayName}`);
});
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
