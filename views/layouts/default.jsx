const React = require('react');
const PropTypes = require('prop-types');

function DefaultLayout({ children }) {
  return (
    <html
      lang="en-US"
      style={{
        fontFamily: 'Roboto',
      }}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Cabin Internet Speed</title>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-screen bg-gray-800 text-gray-200">{children}</body>
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
