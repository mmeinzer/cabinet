const React = require('react');
const PropTypes = require('prop-types');

function DefaultLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
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
