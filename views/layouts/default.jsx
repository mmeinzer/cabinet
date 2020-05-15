const React = require('react');
const PropTypes = require('prop-types');

function DefaultLayout({ title, children }) {
  return (
    <html lang="en-US">
      <head>
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

DefaultLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array,
};

module.exports = DefaultLayout;
