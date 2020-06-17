function createAddSample(pool) {
  const text =
    'INSERT INTO samples(ping, download, upload, added) VALUES ($1, $2, $3, $4) RETURNING *;';

  return function addSample({ ping, download, upload }) {
    const timestamp = new Date();

    pool.query(text, [ping, download, upload, timestamp]);
  };
}

function initTable(pool) {
  const text = `
    CREATE TABLE IF NOT EXISTS samples(
      id        SERIAL,
      ping      INT,
      download  REAL,
      upload    REAL,
      added     TIMESTAMPTZ
    );
  `;

  return pool
    .query(text)
    .then(() => {
      console.log('table created or exists');
      return null;
    })
    .catch(err => {
      console.error('error trying to create table');
      throw err;
    });
}

function generateSamplesRepo(pool) {
  initTable(pool).catch(() => {
    console.error('error creating samples table');
    process.exit(1);
  });

  return {
    addOne: createAddSample(pool),
  };
}

module.exports = { generateSamplesRepo };
