'use strict';

module.exports = Command;

function Command(options) {
  this.name = options.name;
  this.description = options.description;
}

Command.prototype.run = function(argv) {
  throw new Error("Command should implement run");
}

Command.prototype.register = function(name) {

}
