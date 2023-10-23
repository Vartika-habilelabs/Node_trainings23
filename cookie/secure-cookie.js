const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Simulated user database
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

// Session storage
const sessions = {};

// Function to generate a random session token
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

app.get('/', (req, res) => {
  const sessionToken = req.cookies.sessionToken;
  if (sessionToken && sessions[sessionToken]) {
    res.send(`Welcome, ${sessions[sessionToken].username}`);
  } else {
    res.send('Home Page - You are not logged in.');
  }
});

app.get('/login', (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="Username" /><br />
      <input type="password" name="password" placeholder="Password" /><br />
      <input type="submit" value="Login" />
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Generate a session token and store it in the server
    const sessionToken = generateSessionToken();
    sessions[sessionToken] = { username: user.username };

    // Set a secure and HttpOnly cookie for the session
    res.cookie('sessionToken', sessionToken, { httpOnly: true, secure: true });
    res.redirect('/');
  } else {
    res.send('Login failed. Check your username and password.');
  }
});

app.get('/logout', (req, res) => {
  const sessionToken = req.cookies.sessionToken;
  if (sessionToken && sessions[sessionToken]) {
    // Clear the session on the server
    delete sessions[sessionToken];
  }

  // Clear the client-side session cookie
  res.clearCookie('sessionToken');
  res.redirect('/');
});

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});


