const React = require('react');
const PropTypes = require('prop-types');

const DefaultLayout = require('./layouts/default');
const Summary = require('./components/Summary');

function HelloMessage({ samples }) {
  return (
    <DefaultLayout>
      <Summary sample={samples[samples.length - 1]} />
    </DefaultLayout>
  );
}

HelloMessage.propTypes = {
  samples: PropTypes.array,
};

module.exports = HelloMessage;
