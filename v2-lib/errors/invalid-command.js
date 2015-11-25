var IonicError - require('ionic-error');

module.exports = InvalidCommandError;

function InvalidCommandError(message) {
  this.name = 'InvalidCommandError';
  this.message = message || '';
  this.stack = (new Error()).stack;
}

InvalidCommandError.prototype = Object.create(IonicError.prototype);
