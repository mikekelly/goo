/*!
* goo - Resource
* Copyright(c) 2011 Mike Kelly <mikekelly321@gmail.com>, Mike Amundsen <mamund@yahoo.com>
* MIT Licensed
*/


/*
* Build a resource jsgi-component from a resource definition
*/
var Resource = function (definition) {

  // apply all properties of definition to this object
  for(var prop in definition) {
    if(definition.hasOwnProperty(prop)){
      this[prop] = definition[prop];
    }
  }

  // keep this available to inner function
  var resource = this;

  // return a jsgi component
  return function (request) {
    try {
      // delegate request to corresponding method handler
      var methodHandler = resource.methods[request.method];
      return methodHandler(request);
    } catch (e) {
      // we're here because there was no appropriate method handler implemented
      return resource.methodNotAllowed(request);
    }
  };

};

/*
* 405 responder that a Resource will defer to if it does not have
* method implemented which corresponds to a given request.
*/
Resource.prototype.methodNotAllowed = function (request) {
  var allowed = [];
  // find implemented methods to populate Allow header
  for(var prop in this.methods) {
    if(this.methods.hasOwnProperty(prop)) {
      allowed.push(prop);
    }
  }
  // return 405 response
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
* Generates jsgi component from supplied resource definition
*/
exports.generate = function (definition) {

  return new Resource(definition);

};
