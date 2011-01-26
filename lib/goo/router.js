/*
* build a router from routes and resources
*/
exports.generate = function(routes, resources) {
  var despatcher = {};

  for(var route in routes){
    despatcher[route] = resources[routes[route]];
  }

  /*
  * return jsgi component that matches + despatches requests to
  * resources
  */
  return function (request) {
    for (var route in routes){
      if(request.pathInfo.match(route)){
        return despatcher[route](request);
      }
    }

    return {
      status: 404,
      headers: {
        "Content-Type": "text/plain"
      },
      body: ["404 : Not Found"]
    };
  };
};

