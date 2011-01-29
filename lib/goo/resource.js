/*!
* goo - Resource
* Copyright(c) 2011 Mike Kelly <mikekelly321@gmail.com>
* MIT Licensed
*/


var Resource = function (definition) {

  for(var prop in definition) {
    if(definition.hasOwnProperty(prop)){
      this[prop] = definition[prop];
    }
  }

  var resource = this;

  return function (request) {
    try {
      var methodHandler = resource.methods[request.method];
      return methodHandler(request);
    } catch (e) {
      return resource.methodNotAllowed(request);
    }
  };

};

Resource.prototype.methodNotAllowed = function (request) {
  var allowed = [];
  for(var prop in this.methods) {
    if(this.methods.hasOwnProperty(prop)) {
      allowed.push(prop);
    }
  }
  return {
    status: 405,
    headers: {
      "Content-Type": "text/plain",
      "Allow": allowed.join()
    },
    body: ["405: Method Not Allowed"]
  };
};

/*
* Generate a jsgi component from the supplied resource definition object
*/
exports.generate = function (definition) {

  return new Resource(definition);

};
