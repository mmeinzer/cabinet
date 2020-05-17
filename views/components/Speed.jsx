const React = require('react');
const PropTypes = require('prop-types');

function Speed({ speed, unit = 'Mbps' }) {
  if (typeof speed !== 'number' || typeof speed.toFixed !== 'function') {
    console.log(speed);
    return null;
  }

  return (
    <div>
      <span>{speed.toFixed(2)}</span>{' '}
      <span className="font-thin text-gray-500 text-xl">{unit}</span>
    </div>
  );
}

Speed.propTypes = {
  speed: PropTypes.number.isRequired,
  unit: PropTypes.string,
};

module.exports = Speed;
