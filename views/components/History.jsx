const React = require('react');
const PropTypes = require('prop-types');

const { subDays } = require('date-fns/fp');
const { isAfter } = require('date-fns');

const Speed = require('./Speed');

const subSevenDays = subDays(7);
const subOneDay = subDays(1);

function History({ samples }) {
  const oneDayAgo = subOneDay(new Date());
  const sevenDaysAgo = subSevenDays(new Date());

  const pastWeekSamples = samples.filter(({ time }) =>
    isAfter(time, sevenDaysAgo)
  );
  const weeklyAverageDown =
    pastWeekSamples.reduce((sum, sample) => sum + sample.download, 0) /
    samples.length;

  const pastDaySamples = samples.filter(({ time }) => isAfter(time, oneDayAgo));
  const dailyAverageDown =
    pastDaySamples.reduce((sum, sample) => sum + sample.download, 0) /
    samples.length;

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
