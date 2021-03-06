const React = require('react');
const PropTypes = require('prop-types');

const { subDays } = require('date-fns/fp');
const { isAfter } = require('date-fns');

const Speed = require('./Speed');

const subOneDay = subDays(1);

function History({ samples }) {
  let weeklyAverageDown = 0;
  if (samples.length > 0) {
    weeklyAverageDown =
      samples.reduce((sum, sample) => sum + sample.download, 0) /
      samples.length;
  }

  const oneDayAgo = subOneDay(new Date());
  const pastDaySamples = samples.filter(({ added }) =>
    isAfter(added, oneDayAgo)
  );
  let dailyAverageDown = 0;
  if (pastDaySamples.length > 0) {
    dailyAverageDown =
      pastDaySamples.reduce((sum, sample) => sum + sample.download, 0) /
      pastDaySamples.length;
  }

  return (
    <>
      {samples.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex flex-col items-center text-center text-2xl leading-tight">
            <p className="text-xl font-light text-gray-200 border-b-2">
              Averages
            </p>
            <div className="mt-3">
              <p className="text-sm font-light text-gray-500">Daily</p>
              <Speed speed={dailyAverageDown} />
            </div>
            <div className="mt-3">
              <p className="text-sm font-light text-gray-500">Weekly</p>
              <Speed speed={weeklyAverageDown} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

History.propTypes = {
  samples: PropTypes.array,
};

module.exports = History;
