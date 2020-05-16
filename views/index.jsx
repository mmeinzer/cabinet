const React = require('react');
const PropTypes = require('prop-types');
const { utcToZonedTime, format } = require('date-fns-tz');

const DefaultLayout = require('./layouts/default');

function HelloMessage({ sample, count }) {
  let formattedDateTime;
  if (sample) {
    const centralDate = utcToZonedTime(sample.time, 'America/Chicago');
    formattedDateTime = {
      date: format(centralDate, 'MMM do'),
      time: format(centralDate, 'h:mm a'),
    };
  }

  return (
    <DefaultLayout>
      {!sample && <div>No test results</div>}
      {formattedDateTime && (
        <div>
          {formattedDateTime.date} at {formattedDateTime.time}
        </div>
      )}
      {sample && (
        <>
          <div>Down: {sample.download} Mbps</div>
          <div>Up: {sample.upload} Mbps</div>
          <div>Ping: {sample.ping} ms</div>
          <div>Total samples: {count}</div>
        </>
      )}
    </DefaultLayout>
  );
}

HelloMessage.propTypes = {
  sample: PropTypes.object,
  count: PropTypes.number,
};

module.exports = HelloMessage;
