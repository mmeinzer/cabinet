const React = require('react');
const PropTypes = require('prop-types');
const { getTime } = require('date-fns');

function Chart({ samples }) {
  const dataArrayString = `[${samples
    .map(sample => `{x: ${getTime(sample.added)}, y: ${sample.download}}`)
    .join(',')}]`;

  console.log(dataArrayString);

  return (
    <div className="mt-8 mx-4 flex justify-center">
      <div
        className="ct-chart ct-major-seventh"
        style={{ maxWidth: `900px` }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var data = {
              series: [${dataArrayString}]
            };

            var options = {
              fullWidth: true,
              lineSmooth: false,
              low: 0,
              showArea: true,
              axisX: {
                type: Chartist.AutoScaleAxis,
                showGrid: false,
                showLabel: false,
              }
            };

            new Chartist.Line('.ct-chart', data, options);`,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `.ct-label {color: white;} .ct-grid {stroke: white;}`,
        }}
      />
    </div>
  );
}

Chart.propTypes = {
  samples: PropTypes.array.isRequired,
};

module.exports = Chart;
