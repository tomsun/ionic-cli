'use strict'

var Command = require('./command'),
    Response = require('../response'),
    CommandNotFoundError = require('../errors/command-not-found'),
    InvalidCommandError = require('../errors/invalid-command'),
    IonicAppLib = require('ionic-app-lib'),
    Start = IonicAppLib.v2.start,
    Q = require('q'),
    path = require('path');

module.exports = StartCommand;

function StartCommand(options){
  Command.call(this, options);

  // For now, start requires v2 flag
  var argv = this.argv;
  if (!argv.v2) {
    throw new CommandNotFoundError();
  }
  if (argv._.length < 2) {
    // TODO print help in handler
    throw new InvalidCommandError('Not enough arguments to start!');
  }
  if (argv._[1] == '.' || argv._[1] == '..') {
    throw new InvalidCommandError(argv._[1] + ' is not a valid app name');
  }
}

StartCommand.prototype = Object.create(Command.prototype);

StartCommand.prototype.name = "start";
StartCommand.prototype.description = "The start command";
StartCommand.prototype.args = ['[options]', '<app-name>', '[template]'];
StartCommand.prototype.optDescriptions = {}

StartCommand.prototype.run = function(){
  var options = this.buildOptions();

  var promptPromise;
  if (existsSync(options.projectPath)) {
    promptPromise = Start.promptForOverwrite(options.projectPath);
  } else {
    promptPromise = Q(true);
  }

  return promptPromise
  .then(function(promptToContinue) {
    if (!promptToContinue) {
      throw new Response('Ionic start cancelled by user.');
    }
    return Start.startApp(options);
  })
  .then(function() {
    return Start.printQuickHelp(options);
  })
  .then(function() {
    return Start.promptLogin(options);
  })
  .then(function() {
    return new Response('New to Ionic? Get started here: http://ionicframework.com/docs/v2/getting-started');
  })
  .catch(function(error) {
    throw error;
  });
}

StartCommand.prototype.buildOptions = function(){
  var options = {};

  // Grab the app's relative directory name
  options.projectDir = this.argv._[1];
  options.projectPath = path.resolve(options.projectDir);
  options.template = this.argv._[2];

  return options;
}

function existsSync(fp) {
  try {
    fs.accessSync(fp);
    return true;
  } catch (err) {
    return false;
  }
}