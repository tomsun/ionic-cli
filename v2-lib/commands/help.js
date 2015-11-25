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
  debugger;
  printHelp(CommandType.prototype);
}

function printHelp(cmd) {
  var w = function(s) {
    process.stdout.write(s);
  };

  var rightColumn = 41;

  var usage = 'ionic ' + cmd.name + cmd.args.join(' ');
  w(usage.green)

  while( (taskArgs + spaces).length < rightColumn + 1) {
    dots += '.';
  }

  w(' ' + dots.grey + '  ');

  if(cmd.summary) {
    w(cmd.summary.bold);
  }

  for(arg in cmd.args) {
    if( !cmd.args[arg] ) continue;

    indent = '';
    w('\n');
    while(indent.length < rightColumn) {
      indent += ' ';
    }
    w( (indent + '    ' + arg + ' ').bold );

    var argDescs = cmd.args[arg].split('\n');
    var argIndent = indent + '    ';

    for(x=0; x<arg.length + 1; x++) {
      argIndent += ' ';
    }

    for(x=0; x<argDescs.length; x++) {
      if(x===0) {
        w( argDescs[x].bold );
      } else {
        w( '\n' + argIndent + argDescs[x].bold );
      }
    }
  }

  indent = '';
  while(indent.length < cmd.name.length + 1) {
    indent += ' ';
  }

  var optIndent = indent;
  while(optIndent.length < rightColumn + 4) {
    optIndent += ' ';
  }

  for(var opt in cmd.options) {
    w('\n');
    dots = '';

    var optLine = indent + '[' + opt + ']  ';

    w(optLine.yellow.bold);

    if(cmd.options[opt]) {
      while( (dots.length + optLine.length - 2) < rightColumn) {
        dots += '.';
      }
      w(dots.grey + '  ');

      var taskOpt = cmd.options[opt],
          optDescs;

      if (typeof taskOpt == 'string') {
        optDescs = taskOpt.split('\n');
      } else {
        optDescs = taskOpt.title.split('\n');
      }
      for(x=0; x<optDescs.length; x++) {
        if(x===0) {
          w( optDescs[x].bold );
        } else {
          w( '\n' + optIndent + optDescs[x].bold );
        }
      }
    }
  }

  w('\n');
}
