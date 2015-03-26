var generators = require("yeoman-generator");
var _          = require("lodash");


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
    }];

    this.prompt(prompts, function(props) {
      var self = this;
      _.each(prompts, function(p) { self[p.name] = props[p.name]; });
      done();
    }.bind(this));
  },

  writing: {
    // TODO
  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options["skip-install"]
    });
  }

});
