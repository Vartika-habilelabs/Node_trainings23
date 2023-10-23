const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

app.get('/', (req, res) => {
  const user = req.cookies.user;
  if (user) {
    res.send(`Welcome, ${user}`);
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
    // Set a cookie for authentication
    res.cookie('user', user.username);
    res.redirect('/');
  } else {
    res.send('Login failed. Check your username and password.');
  }
});

app.get('/logout', (req, res) => {
  // Clear the user cookie to log out
  res.clearCookie('user');
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
