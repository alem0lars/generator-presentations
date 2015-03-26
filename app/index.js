var generators = require("yeoman-generator");
var _          = require("lodash");
var _s         = require("underscore.string");


module.exports = generators.Base.extend({

  askFor: function() {
    var done = this.async();

    var prompts = [{
      name: "presTitle",
      message: "What's the presentation title?"
    }, {
      type: "confirm",
      name: "impressConsole",
      message: "Would you like to include the impress-console?",
      default: true
    }, {
      name: "pkgVers",
      message: "What version should we put in package.json file?",
      default: "0.0.1"
    }, {
      name: "repoUrl",
      message: "What's the repository url?"
    }, {
      name: "authorName",
      message: "What's the presentation author name?"
    }, {
      name: "authorEmail",
      message: "What's the presentation author email?"
    }, {
      name: "authorUrl",
      message: "What's the presentation author website?"
    }];

    this.prompt(prompts, function(props) {
      var self = this;
      _.each(prompts, function(p) { self[p.name] = props[p.name]; });
      done();
    }.bind(this));
  },

  writing: function() {
    this.template("package.json");
    this.template("editorconfig", ".editorconfig");

    this.remote("nextreamlabs", "lintersjam", function(err, remote) {
      remote.copy(".", "jshintrc");
    });

    this.template("travis.yml", ".travis.yml");
    this.template("README.md");
    this.copy("gitattributes", ".gitattributes");
    this.copy("gitignore", ".gitignore");
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options["skip-install"]
    });
  }

});
