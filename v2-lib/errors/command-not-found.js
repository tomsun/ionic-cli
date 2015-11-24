module.exports = CommandNotFoundError;

function CommandNotFoundError(message) {
  this.name = 'CommandNotFoundError';
  this.message = message;
  this.stack = (new Error()).stack;
}

CommandNotFoundError.prototype = Object.create(Error.prototype);
