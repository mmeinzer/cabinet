require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const expressReactViews = require('express-react-views');

const app = express();

const state = {
  samples: [],
};

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
  const { samples } = state;
  const last = samples[samples.length - 1];

  res.render('index', {
    sample: last,
    count: samples.length,
  });
});

app.post('/samples', auth, (req, res) => {
  const { ping, download, upload } = req.body;
  if (!ping || !download || !upload) {
    console.log('Missing info on request');

    res.json({ message: 'Ok', err: null });
    return;
  }

  state.samples.push({ ping, download, upload, time: Date.now() });

  res.json({ message: 'Ok', err: null });
});

const port = process.env.PORT;
if (!port) {
  console.error(`No PORT specified`);
  process.exit(1);
}
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
