var sys = require ('sys'); // minor convenience :)

var jsgi = require('jsgi');

var Router    = require('./Janus/router');
var Resource  = require('./Janus/resource');

var config = {
  paths: {
    routes: '/config/routes'
  }
};

var Janus = exports;

Janus.app = function(cwd) {
  // TODO: additional param for customising config
  var routes = require(cwd + config.paths.routes).routes;
  var router = Router.generate(routes);
  return {
    start: function() {
      //dummy jsgi component that just returns a response
      var dummy = function(req) {
        return {
            status: 200,
            headers: {
              "Content-Type": "text/plain"
            },
            body: ["Hello world."]
        };
      };
      jsgi.start(dummy);
    }
  };
};
