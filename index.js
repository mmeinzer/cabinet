require('dotenv').config();

const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

const { USERNAME, PASSWORD } = process.env;
if (!USERNAME || !PASSWORD) {
  const missing = USERNAME ? 'PASSWORD' : 'USERNAME';

  console.error(`Missing ${missing} environment variable`);
  process.exit(1);
}

const auth = basicAuth({
  users: { [USERNAME]: PASSWORD },
});

app.get('/', (req, res) => {
  res.json({ answer: 'hello' });
});

app.post('/samples', auth, (req, res) => {
  res.json({ auth: req.auth.user });
});

app.listen(3000);
