/*!
* goo - Router
* Copyright(c) 2011 Mike Kelly <mikekelly321@gmail.com>, Mike Amundsen <mamund@yahoo.com>
* MIT Licensed
*/

/*
* build a router from routes and resources
*/
exports.generate = function(routes, resources) {
  var despatcher = {};

  for(var route in routes){
    if(routes.hasOwnProperty(route)){
      despatcher[route] = resources[routes[route]];
    }
  }

  /*
  * return jsgi component that matches + despatches requests to
  * resources
  */
  return function (request) {
    // Try each route regex against the effective request URI
    for (var route in routes){
      if(request.pathInfo.match(route)){
        return despatcher[route](request);
      }
    }
    // if we're here it's because no URI matched so return a 404
    return {
      status: 404,
      headers: {
        "Content-Type": "text/plain"
      },
      body: ["404 : Not Found"]
    };
  };
};

