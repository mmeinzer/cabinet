function shutdown(appServer, dbPool) {
  return async () => {
    console.log('shutdown signal received');

    console.log('closing database pool');
    await dbPool.end();
    console.log('pool is closed');

    console.log('closing server');
    appServer.close(() => {
      console.log('server is closed');
      process.exit(0);
    });
  };
}

module.exports = shutdown;
