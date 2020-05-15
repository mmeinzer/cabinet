require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { name: 'Matt', title: 'Cabin Internet Speed' });
});

app.post('/samples', auth, (req, res) => {
  res.json({ auth: req.auth.user });
});

const port = process.env.PORT;
if (!port) {
  console.error(`No PORT specified`);
  process.exit(1);
}
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
