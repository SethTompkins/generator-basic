'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var exec = require('child_process').exec;


var BasicGenerator = module.exports = function BasicGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function() {
        console.log("\n\nAll dependencies have been installed! Running Grunt...\n\n");
        exec("grunt");
        console.log("All done!");
      }
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.today = new Date();
  this.fullDate = this.today.getFullYear();
  this.fullDate += '-' + (this.today.getUTCMonth() + 1);
  this.fullDate += '-' + this.today.getDate();
};

util.inherits(BasicGenerator, yeoman.generators.Base);

BasicGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // Have Yeoman greet the user.
  console.log(this.yeoman);
  console.log("I just have a few questions to ask...\n");

  var prompts = [{
    type: 'input',
    name: 'authorName',
    message: 'What is your name?'
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'What is your email address?'
  },
  {
    type: 'input',
    name: 'jQueryVer',
    message: "Which version of jQuery would you like? Use 'latest' for the most recent.",
    default: '1.4.2'
  }];

  this.prompt(prompts, function (props) {
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.jQueryVer = props.jQueryVer;

    cb();
  }.bind(this));
};

BasicGenerator.prototype.folders = function folders() {
  this.mkdir('dev');
  this.mkdir('dev/css');
  this.mkdir('dev/scss');
  this.mkdir('dev/scss/components');
  this.mkdir('dev/scss/modules');
  this.mkdir('dev/scss/page');
  this.mkdir('dev/scss/vendor');
  this.mkdir('dev/img');
  this.mkdir('dev/js');
  this.mkdir('dev/components');
  this.mkdir('build');
};

BasicGenerator.prototype.projectFiles = function projectFiles() {
  // Git
  this.copy('_.gitignore', '.gitignore');

  // EditorConfig
  this.copy('_.editorconfig', '.editorconfig');

  // Node
  this.template('_package.json', 'package.json');

  // Grunt
  this.copy('_gruntfile.js', 'gruntfile.js');

  // Bower
  this.template('_.bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');

  // Project
  this.template('_dev/_index.html', 'dev/index.html');
  this.copy('_dev/_scss/_style.scss', 'dev/scss/style.scss');
  this.copy('_dev/_scss/_modules/_modules.scss', 'dev/scss/modules/modules.scss');
  this.copy('_dev/_scss/_modules/_functions.scss', 'dev/scss/modules/functions.scss');
  this.copy('_dev/_scss/_modules/_mixins.scss', 'dev/scss/modules/mixins.scss');
  this.copy('_dev/_scss/_components/_components.scss', 'dev/scss/components/components.scss');
  this.copy('_dev/_scss/_components/_layout.scss', 'dev/scss/components/layout.scss');
  this.copy('_dev/_scss/_components/_typography.scss', 'dev/scss/components/typography.scss');
  this.copy('_dev/_scss/_components/_variables.scss', 'dev/scss/components/variables.scss');
  this.copy('_dev/_scss/_page/_page.scss', 'dev/scss/page/page.scss');
  this.copy('_dev/_scss/_page/_index.scss', 'dev/scss/page/index.scss');
  this.copy('_dev/_scss/_vendor/_vendor.scss', 'dev/scss/vendor/vendor.scss');
  this.copy('_dev/_scss/_vendor/_reset.scss', 'dev/scss/vendor/reset.scss');
};
