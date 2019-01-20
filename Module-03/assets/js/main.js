// Enables all tooltips from Bootstrap
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Shaun Utilities
const SCM = function () {}

SCM.prototype.selectAndServe = function (selector, content, append = false) {
  let ele = document.querySelector(selector);

  if (append)
    ele.append(content);
  else
    ele.textContent = content;
}

SCM.prototype.evaluate = function (block, selector = false) {
  try {
    block();
  } catch (err) {
    console.log("ERROR:", err.message);

    if (selector)
      this.selectAndServe(selector, err.message);
  }
}

// Shaun data type eval methods
SCM.prototype.isType = function (varName, variable, type) {
  if (variable === undefined)
    throw {message: `${varName} is of type undefined`}

  if (type === 'array' && variable.constructor.name === "Array")
    return
  
  if (typeof variable !== type) {
    if (variable.constructor.name === "Array")
      throw {message: `${varName} is not of type ${type}. It is of type ${variable.constructor.name.toLowerCase()}`};
    else
      throw {message: `${varName} is not of type ${type}. It is of type ${typeof variable}.`};
  }
}

SCM.prototype.isString = function (varName, variable) {
  this.isType(varName, variable, 'string');
}

SCM.prototype.isNumber = function (varName, variable) {
  this.isType(varName, variable, 'number');
}

SCM.prototype.isBoolean = function (varName, variable) {
  this.isType(varName, variable, 'boolean');
}

SCM.prototype.isArray = function (varName, variable) {
  this.isType(varName, variable, 'array');
}

SCM.prototype.isObject = function (varName, variable) {
  this.isType(varName, variable, 'object');
}

SCM.prototype.isFunction = function (varName, variable) {
  this.isType(varName, variable, 'function');
}

// Testing visibility
SCM.prototype.isBlockScope = function (varName, variable) {
  if (window[varName] !== undefined)
    throw {message: `${varName} is not block scoped.`};
    return false
  return true
}

SCM.prototype.isNotBlockScope = function (varName, variable) {
  if (window[varName] === undefined)
    throw {message: `${varName} is block scoped.`};
    return false
  return true
}

// Array things
SCM.prototype.correctLength = function (varName, variable, length) {
  if (variable.length > length)
    throw {message: `${varName} is too long. It should be a length of ${length}`}

  if (variable.length < length)
    throw {message: `${varName} is too short. It should be a length of ${length}`}

  return true
}

SCM.prototype.isValue = function (variable, value) {
  if (variable !== value)
    throw {message: `${variable} does not equal the expected value of ${value}`}
}

SCM.prototype.isRange = function (variable, from, to) {
  if (variable < from || variable > to)
    throw {message: `${variable} is outside the range of ${from} to ${to}`}
}

SCM.prototype.test = function (condition, success, error, selector = false) {
  if (condition && selector) this.selectAndServe(selector, success);
  if (!condition) throw {message: error}
}

const scm = new SCM;