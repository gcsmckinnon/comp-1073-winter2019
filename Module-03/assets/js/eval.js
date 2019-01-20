// http://2ality.com/2012/07/evaluator-via-eval.html
function Evaluator() {
  this.env = {};
}

Evaluator.prototype.evaluate = function (str) {
  try {
    str = this.rewriteDeclarations(str);

    var __environment__ = this.env;  // (1)
    with (__environment__) {  // (2)
      return JSON.stringify(eval(str));
    }
  } catch (e) {
    return console.log(`ERROR: ${e.toString()}`);
  }
};

Evaluator.prototype.rewriteDeclarations = function (str) {
  // Prefix a newline so that search and replace is simpler
  str = "\n" + str;

  str = str.replace(/\n(let|const|var)?\s*(\w+)\s*\;/g, "\n__environment__.$2 = undefined;");

  str = str.replace(/\n(\w+)\s*=/g,
                    "\n__environment__.$1 =");  // (3)
  str = str.replace(/\nvar\s+(\w+)\s*=/g,
                    "\n__environment__.$1 =");  // (3)
  str = str.replace(/\const\s+(\w+)\s*=/g,
                    "\n__environment__.$1 =");  // (3)
  str = str.replace(/\let\s+(\w+)\s*=/g,
                    "\n__environment__.$1 =");  // (3)
  str = str.replace(/\nfunction\s+(\w+)/g,
                    "\n__environment__.$1 = function");

  return str.slice(1); // remove prefixed newline
}

// this overwrites console log and makes it so we can
// return the values
__logs__ = [];
console.oldlog = console.log;
console.log = function () {
  let args = Array.prototype.slice.call(arguments);
  __logs__.push(args);
  __logs__ = [].concat(...args);
  return console.oldlog.apply(console, args);
}

// new clear
console.oldclear = console.clear;
console.clear = function () {
  __logs__ = [];
  console.oldclear();
}