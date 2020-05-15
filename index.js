require('dotenv').config();

const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

const { USER, PASSWORD } = process.env;
if (!USER || !PASSWORD) {
  console.error('Missing USER or PASSWORD environment variable(s)');
  process.exit(1);
}

const auth = basicAuth({
  users: { [USER]: PASSWORD },
});

app.get('/', (req, res) => {
  res.json({ answer: 'hello' });
});

app.post('/samples', auth, (req, res) => {
  res.json({ auth: req.auth.user });
});

app.listen(3000);
