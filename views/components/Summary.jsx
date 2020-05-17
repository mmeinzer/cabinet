const React = require('react');
const PropTypes = require('prop-types');

const { formatDistanceToNowStrict } = require('date-fns');

function Summary({ sample }) {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col text-center text-2xl leading-tight">
        {sample ? (
          <>
            <p className="text-2xl font-light text-gray-100">Internet Speed</p>
            <p className="text-base text-gray-300">{`${formatDistanceToNowStrict(
              sample.time
            )} ago`}</p>
            <p className="text-center text-sm font-light mt-3 text-gray-500">
              Download
            </p>
            <div>
              <span>{sample.download}</span>{' '}
              <span className="font-thin text-gray-500 text-xl">Mbps</span>
            </div>
            <p className="text-center text-sm font-light mt-3 text-gray-500">
              Upload
            </p>
            <div>
              <span>{sample.upload}</span>{' '}
              <span className="font-thin text-gray-500 text-xl">Mbps</span>
            </div>
            <p className="text-center text-xs font-light mt-2 text-gray-500">
              Ping
            </p>
            <p className="text-center text-lg text-gray-300 font-light">
              {sample.ping}
              <span className="font-thin text-gray-500 text-base">ms</span>
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
