require('dotenv').config();

const express = require('express');
const basicAuth = require('express-basic-auth');
const expressReactViews = require('express-react-views');

const app = express();

app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine());

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
  res.render('index', { name: 'Matt', title: 'Cabin Internet Speed' });
});

app.post('/samples', auth, (req, res) => {
  res.json({ auth: req.auth.user });
});

app.listen(3000);
