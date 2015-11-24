'use strict'

var Q = require('q'),
    optimist = require('optimist');

module.exports = Cli;

function Cli(options){
  this.argv = options.argv;
  this.command = this.argv._[0];
}

Cli.prototype.run = function() {
  //run command
  return this.runCommand()
  .then(function(response){
    console.log('cli run success')
    //process success response appropriately
  })
  .catch(function(error) {
    // process error appropriately
    console.log('cli run error')
    console.log(error.stack)
    throw error
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
    //construct error if it's not already typeof Response
    console.log('error in runCommand');
    throw error;
  });
}

Cli.prototype.lookupCommand = function() {
  console.log("looking up command: " + this.command);
  var CommandType = require('./commands/' + this.command);
  return new CommandType({
    argv: this.argv
  });
}
