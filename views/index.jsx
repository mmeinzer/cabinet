const React = require('react');
const PropTypes = require('prop-types');

const DefaultLayout = require('./layouts/default');

function HelloMessage({ name, title }) {
  return (
    <DefaultLayout title={title}>
      <div>Hello {name}</div>
    </DefaultLayout>
  );
}

HelloMessage.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
};

module.exports = HelloMessage;
