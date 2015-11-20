var q = require('q'),
    optimist = require('optimist');

module.exports = Cli;

function Cli(options){
  this.argv = options.argv;
}

Cli.prototype.run = function() {
  console.log(this.argv);
}

Cli.prototype.runCommand = function runCommand(name, config) {
}

Cli.prototype.registerCommand = function(name) {

}
