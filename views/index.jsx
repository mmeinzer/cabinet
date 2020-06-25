const React = require('react');
const PropTypes = require('prop-types');

const DefaultLayout = require('./layouts/default');
const Summary = require('./components/Summary');
const History = require('./components/History');

function Index({ samples }) {
  return (
    <DefaultLayout>
      <Summary sample={samples[samples.length - 1]} />
      <History samples={samples} />
    </DefaultLayout>
  );
}

Index.propTypes = {
  samples: PropTypes.array,
};

module.exports = Index;
