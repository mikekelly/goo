/*
* Generate a jsgi component from the supplied resource definition object
*/
exports.generate = function (definition) {

  // For now just return a function that doesn't do anything
  return function (request) {
    return {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      },
      body: ["This is a resource"]
    };
  };

}
