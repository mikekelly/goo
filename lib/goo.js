/*!
* goo
* Copyright(c) 2011 Mike Kelly <mikekelly321@gmail.com>, Mike Amundsen <mamund@yahoo.com>
* MIT Licensed
*/

var sys = require ('sys');

var jsgi = require('jsgi');

var Router    = require('./goo/router'),
    Resource  = require('./goo/resource');

var config = {
  paths: {
    routes: '/config/routes',
    resources: '/app/resources'
  }
};

exports.app = function (cwd) {

  config.cwd = cwd;

  var routes = getRoutes();
  var resources = getResources(routes);

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
var getResources = function (routes) {
  var resources = {};
  var resourcesPath = config.cwd + config.paths.resources + '/';
  var resourceName = "";
  var definition = {};

  // for every route; fetch their definition, generate the resource component, add it to the collection
  for(var route in routes) {
    if(routes.hasOwnProperty(route)) {
      try {
        resourceName = routes[route];
        definition = require(resourcesPath + resourceName);
        resources[resourceName] = Resource.generate(definition.resource);
      } catch (err) {
        console.log("WARNING: The route " + route + " does not point to a valid resource definition");
      }
    }
  }

  return resources;
};

/*
* Returns routes defined in routes file (config/routes)
*/
var getRoutes = function () {
  return require(config.cwd + config.paths.routes).routes;
};
