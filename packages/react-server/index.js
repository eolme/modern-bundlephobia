const React = require('next/dist/compiled/react');

const currentIndex = 0;
const createNameIndexed = () => `_${++currentIndex}`;

React.createContext = (defaultValue) => React.createServerContext(defaultValue, createNameIndexed());

module.exports = React;
module.exports.default = React;
