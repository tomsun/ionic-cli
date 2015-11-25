module.exports = IonicError;

function IonicError(message) {
  this.name = 'IonicError';
  this.message = message || '';
  this.stack = (new Error()).stack;
}

IonicError.prototype = Object.create(Error.prototype);
