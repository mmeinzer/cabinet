require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const expressReactViews = require('express-react-views');
const { Pool } = require('pg');

const gracefulShutdown = require('./src/shutdown');
const { generateSamplesRepo } = require('./src/samplesRepo');

const app = express();

app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine());

let dbOpts = {
  connectionString: process.env.DATABASE_URL,
};
if (process.env.NODE_ENV === 'production') {
  console.log('using production db settings');
  dbOpts = {
    ...dbOpts,
    ssl: {
      rejectUnauthorized: false,
    },
  };
}
const pool = new Pool(dbOpts);

const samplesRepo = generateSamplesRepo(pool);
console.log('connected to database');

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

app.get('/', async (_, res) => {
  const samples = await samplesRepo.getWeeklyData();

  res.render('index', {
    samples,
  });
});

app.post('/samples', auth, async (req, res) => {
  const { ping, download, upload } = req.body;

  if (![ping, download, upload].every(numeric => typeof numeric === 'number')) {
    console.log('missing info on request');

    res.json({ message: 'ok', err: null }); // TODO: Send an error message
    return;
  }

  await samplesRepo.addOne({ ping, download, upload });

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
