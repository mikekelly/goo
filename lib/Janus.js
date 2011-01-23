var sys = require ('sys'); // minor convenience :)

var jsgi = require('jsgi');

var Router    = require('./Janus/router');
var Resource  = require('./Janus/resource');

var config = {
  paths: {
    routes: '/config/routes',
    resources: '/app/resources'
  }
};

exports.app = function (cwd) {

  config.cwd = cwd;

  var routes = getRoutes();
  var resources = getResources();

  var router = Router.generate(routes, resources);

  return {
    routes: routes,
    start: function() {
      jsgi.start(router);
    }
  };

};

/* PRIVATE */

/*
* Returns collection of resources that are jsgi components
*/
var getResources = function () {
  var resources = {};
  var resourcePath = config.cwd + config.paths.resources;
  var filePath = "";
  var resourceName = "";
  var definition = {};

  // list all resources in resources directory
  var filenames = require('fs').readdirSync(resourcePath);

  // take each resource definition and generate corresponding jsgi component
  filenames.forEach(function(filename){
    filePath = resourcePath + "/" + filename;
    // take resource name from the filename (minus the '.js' extension)
    resourceName = filename.slice(0,-3);
    try {
      // take definition from the file
      definition = require(filePath);
      // generate jsgi component from resource definition
      resources[resourceName] = Resource.generate(definition.resource);
    } catch (err) {
      console.log("ERROR: Resource defined in " + filePath + " could not be initialized");
    }

  });
  sys.debug(sys.inspect(resources));
  return resources;
};

/*
* Returns routes defined in routes file (config/routes)
*/
var getRoutes = function () {
  routes = require(config.cwd + config.paths.routes).routes;
  sys.debug(sys.inspect(routes));
  return routes;
}
