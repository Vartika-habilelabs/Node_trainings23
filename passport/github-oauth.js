const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const session = require('express-session');

const app = express();

// Use express session middleware to store user sessions
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Replace with your GitHub application credentials
const GITHUB_CLIENT_ID = '';
const GITHUB_CLIENT_SECRET = '';

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/github/callback', // Adjust the callback URL
      scope: ['email'], // Include necessary scopes
    },
    (accessToken, refreshToken, profile, done) => {
      // Implement your authentication logic here, e.g., save or retrieve the user from your database
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize the user and store in the session or database
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Retrieve the user from the session or database
  done(null, user);
});

// Authentication routes
app.get('/auth/github', passport.authenticate('github'));
app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/profile', // Redirect to a success route
    failureRedirect: '/login', // Redirect to a login route on failure
  })
);

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`Welcome, ${req.user.displayName}!`);
  } else {
    res.redirect('/login');
  }
});

app.get('/login', (req, res) => {
  res.send('Please log in with GitHub.');
});

app.get('/logout', (req, res) => {
  req.logout(() => {

  }); // Passport.js function to log the user out
  res.redirect('/login'); // Redirect to the home page or another appropriate location
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
