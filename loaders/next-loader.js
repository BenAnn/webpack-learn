const loaderUtils = require('loader-utils');
module.exports = function (source) {
    const options = loaderUtils.getOptions(this);
    console.log(options.value);
    return 'module.exports = ' + source()
}