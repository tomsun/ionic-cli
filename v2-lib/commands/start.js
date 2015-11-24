'use strict'

var Command = require('./command');

module.exports = StartCommand;

function StartCommand(options){
  Command.call(this, options);
  this.name = "start";
  this.description = "The start command";
}

StartCommand.prototype = Object.create(Command.prototype);

StartCommand.prototype.run = function(){
  throw new Error('test error from start run');
  console.log('run start command');
}