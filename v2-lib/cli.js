'use strict'

var Response = require('./response'),
    Q = require('q'),
    optimist = require('optimist');

//TODO lazy-load
var CommandNotFoundError = require('./errors/command-not-found');

module.exports = Cli;

function Cli(options){
  this.argv = options.argv;
  this.command = this.argv._[0] || 'help';
  this.verbose = this.argv.verbose || this.argv.v;
}

Cli.prototype.run = function() {
  var self = this;

  //TODO cd to root
  //TODO hooks

  return self.runCommand()
  .then(function(response){
    self.handleResponse(response);
  })
  .catch(function(error) {
    self.handleError(error);
    if (error instanceof CommandNotFoundError) {
      console.log('what?');
      throw error
    }
  });
}

Cli.prototype.runCommand = function() {
  console.log('runCommand');
  return Q.fcall(this.lookupCommand.bind(this))
  .then(function(command){
    console.log("running command " + command.name);
    return command.run();
  })
  .catch(function(error){
    console.log('error in runCommand');
    throw error;
  });
}

Cli.prototype.lookupCommand = function() {
  console.log("looking up command: " + this.command);

  try {
    var CommandType = require('./commands/' + this.command);
  } catch (e) {
    throw new CommandNotFoundError();
  }

  return new CommandType({
    argv: this.argv
  });
}

Cli.prototype.handleResponse = function(response) {
  //TODO
  console.log('cli run success');
}

Cli.prototype.handleError = function(error) {

  if (error instanceof CommandNotFoundError) {
    console.log('Command ' + this.command + ' not found.');
  }
  //TODO
  console.log('cli run error');
  if (this.verbose) {
    console.log(error.stack)
  }
}
