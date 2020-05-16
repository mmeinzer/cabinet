const React = require('react');
const PropTypes = require('prop-types');

function DefaultLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cabin Internet Speed</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

module.exports = DefaultLayout;
