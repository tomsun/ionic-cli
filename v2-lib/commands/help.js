'use strict'

var Command = require('./command'),
    Response = require('../response'),
    CommandNotFoundError = require('../errors/command-not-found'),
    InvalidCommandError = require('../errors/invalid-command'),
    IonicAppLib = require('ionic-app-lib'),
    Start = IonicAppLib.v2.start,
    Q = require('q'),
    path = require('path');

module.exports = HelpCommand;

function HelpCommand(options){
  Command.call(this, options);

  // For now, help requires v2 flag
  if (!this.argv.v2) {
    throw new CommandNotFoundError();
  }

  this.command = this.argv._[1];
}

HelpCommand.prototype = Object.create(Command.prototype);

HelpCommand.prototype.name = "help";
HelpCommand.prototype.description = "Prints the description of the provided command or all commands";
HelpCommand.prototype.args = ['[command]']
HelpCommand.prototype.optDescriptions = {}

HelpCommand.prototype.run = function(){
  console.log('looking up help for: ' + this.command);
  if (!this.command){
    //print all commands
  }

  try {
    var CommandType = require('./' + this.command);
  } catch (e) {
    throw new Error('No command named ' + this.command);
  }
  console.log('found help: ' + CommandType.prototype.name);
}

function printHelp() {
  
}
