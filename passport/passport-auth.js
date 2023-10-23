const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const session = require("express-session");

const app = express();

// Use express session middleware to store user sessions
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: "100319854071-klbrobv9efdgmgpqfheqp5j8dtfpmvmp.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      // This function is called when a user successfully signs in with Google.
      // You can handle the user's data and authentication here.
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user (required for session support)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/contacts"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect or handle here
    res.redirect("/profile");
  }
);

app.get("/profile", (req, res) => {
  // Access user data in req.user
  res.send(`Welcome, ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
