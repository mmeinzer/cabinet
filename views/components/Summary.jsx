const React = require('react');
const PropTypes = require('prop-types');

function Summary({ sample }) {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col text-right text-2xl">
        {sample ? (
          <>
            <p className="text-center text-sm font-light mt-2">Download</p>
            <div>
              <span>{sample.download}</span>{' '}
              <span className="font-thin text-gray-500">Mbps</span>
            </div>
            <p className="text-center text-sm font-light mt-2">Upload</p>
            <div>
              <span>{sample.upload}</span>{' '}
              <span className="font-thin text-gray-500">Mbps</span>
            </div>
            <p className="text-center text-xs font-light mt-2">Ping</p>
            <p className="text-center text-lg">
              {sample.ping}
              <span className="font-thin text-gray-500">ms</span>
            </p>
          </>
        ) : (
          <p>There is no data</p>
        )}
      </div>
    </div>
  );
}

Summary.propTypes = {
  sample: PropTypes.object,
};

module.exports = Summary;
