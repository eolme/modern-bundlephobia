let mitt = require('next/dist/shared/lib/mitt');

mitt = mitt.default || mitt;

module.exports = mitt;
module.exports.mitt = mitt;
module.exports.default = mitt;
