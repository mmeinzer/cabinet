require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const expressReactViews = require('express-react-views');
const { Pool } = require('pg');

const gracefulShutdown = require('./src/shutdown');

const app = express();

const state = {
  samples: [],
};

app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT NOW() as now', err => {
  if (err) {
    console.error('error querying database on startup');
    process.exit(1);
  }

  console.log('connected to database');
});

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

app.get('/', (_, res) => {
  const { samples } = state;

  res.render('index', {
    samples,
  });
});

app.post('/samples', auth, (req, res) => {
  const { ping, download, upload } = req.body;

  if (![ping, download, upload].every(numeric => typeof numeric === 'number')) {
    console.log('missing info on request');

    res.json({ message: 'ok', err: null });
    return;
  }

  state.samples.push({ ping, download, upload, time: Date.now() });

  res.json({ message: 'ok', err: null });
});

const port = process.env.PORT;
if (!port) {
  console.error(`no PORT specified in environment`);
  process.exit(1);
}

const server = app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

const shutdown = gracefulShutdown(server, pool);

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
