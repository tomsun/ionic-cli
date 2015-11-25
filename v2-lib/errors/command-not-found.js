var IonicError = require('./ionic-error');

module.exports = CommandNotFoundError;

function CommandNotFoundError(message) {
  this.name = 'CommandNotFoundError';
  this.message = message || '';
  this.stack = (new Error()).stack;
}

CommandNotFoundError.prototype = Object.create(IonicError.prototype);
