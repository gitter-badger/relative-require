var path = require('path');

module.exports = function (src) {
  return function (id) {
    var rootPath = path.dirname(src);

    // Need to cover all cases
    if (id.startsWith('./')) {
      id = id.replace('./', rootPath + '/');
      id = path.resolve(id);
    }
    else {
      id = path.join(rootPath, 'node_modules', id);
    }

    return require(id);
  };
};