const React = require('react');
const PropTypes = require('prop-types');

function Summary({ sample }) {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col text-right text-2xl">
        {sample ? (
          <>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 492 492"
                className="inline h-4 mr-3"
              >
                <path
                  fill="#718096"
                  d="M484 125l-16-16a27 27 0 00-38 0L246 293 62 109c-5-6-12-8-19-8s-14 2-19 8L8 125a27 27 0 000 38l219 220c5 5 12 8 19 8s14-3 19-8l219-220a27 27 0 000-38z"
                />
              </svg>
              <span>{sample.download}</span>{' '}
              <span className="font-thin text-gray-500">Mbps</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 492 492"
                className="inline h-4 mr-3"
              >
                <path
                  fill="#718096"
                  d="M484 328L265 109a27 27 0 00-38 0L8 328a27 27 0 000 38l16 16c5 6 12 8 19 8s14-2 19-8l184-183 184 184a27 27 0 0038 0l16-16c11-11 11-28 0-39z"
                />
              </svg>
              <span>{sample.upload}</span>{' '}
              <span className="font-thin text-gray-500">Mbps</span>
            </div>
            <p className="text-center">
              {sample.ping} <span className="font-thin text-gray-500">ms</span>
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
