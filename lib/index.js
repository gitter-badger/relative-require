'use strict';

var path = require('path');
var debug = require('debug')('relativeRequire');

module.exports = function (dir) {
  debug('the requested relative path is %s', dir);

  return function (name) {
    debug('%s is required', name);

    try {
      debug('resolving %s', name);
      var resolve = require.resolve(name);

      debug('%s - require resolved', resolve);
      debug('Checking if its a native module');

      if (path.dirname(resolve) !== '.') {
        throw new Error('Not native module');
      }

      debug('%s is a native module', name);
    }
    catch (e) {
      debug('%s is not a native module', name);

      if (/^\./.test(name)) {
        debug('the required module is a relative path that starts with \'./\'');
        name = name.replace('./', dir + '/');
        name = path.resolve(name);
      }
      else {
        name = path.join(dir, 'node_modules', name);
      }

      debug('the location of the required package is %s', name);
    }

    return require(name);
  };
};