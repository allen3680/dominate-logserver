import pupa = require('pupa');
String.prototype.format = function (data) {
  return pupa(this, data);
};
