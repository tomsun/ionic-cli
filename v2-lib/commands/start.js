'use strict'

var Command = require('./command'),
    Response = require('../response'),
    IonicAppLib = require('ionic-app-lib'),
    Start = IonicAppLib.v2.start,
    Q = require('q'),
    path = require('path');

module.exports = StartCommand;

function StartCommand(options){
  Command.call(this, options);
  this.name = "start";
  this.description = "The start command";

  //TODO options array
}

StartCommand.prototype = Object.create(Command.prototype);

StartCommand.prototype.run = function(){
  this.validate();
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
      throw new Error('Ionic start cancelled by user.');// TODO add error type
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

StartCommand.prototype.validate = function() {
  var argv = this.argv;
  if (argv._.length < 2) {
    // TODO type invalid command, print help
    throw new Error('Start command is invalid');
  }

  if (argv._[1] == '.') {
    throw new Error('Please name your Ionic project something meaningful other than \'.\'');
  }
}

function existsSync(fp) {
  try {
    fs.accessSync(fp);
    return true;
  } catch (err) {
    return false;
  }
}