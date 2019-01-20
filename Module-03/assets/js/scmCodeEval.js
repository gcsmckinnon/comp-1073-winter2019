const SCMCodeEval = function () {}

SCMCodeEval.prototype.checkPattern = function (pattern, obj, message = false) {
  let search = obj.getSearchCursor(pattern);

  if (!search.findNext()) {
    throw {message: (message || "There is likely an issue with your syntax. Please try again.")}
  } else {
    return {from: search.from(), to: search.to(), matches: obj.getValue().match(pattern)}
  }
}

SCMCodeEval.prototype.isBlock = function (varName, obj) {
  let pattern = new RegExp(`[let|const] ${varName}`, 'g');
  this.checkPattern(pattern, obj, `${varName} is not block scoped. Please correct your syntax.`);
}

SCMCodeEval.prototype.isConcatenated = function (varName, obj) {
  let pattern = new RegExp(`\\s*\\+\\s*${varName}\\s*(\\+\\s*")?|("\\+)?\\s*${varName}\\s*\\+\\s*`, 'g');
  this.checkPattern(pattern, obj, `${varName} is not concatenated correctly. Please correct your syntax.`);
}

SCMCodeEval.prototype.isInterpolated = function (expression, obj) {
  let pattern = new RegExp(`$\\{${expression}\\}`, 'g');
  this.checkPattern(pattern, obj, `The expression, (${expression}), is not within the proper interpolation \$\{\} block. Please correct your syntax.`);
}

SCMCodeEval.prototype.setPass = function (obj, selector = false, message = false) {
  let textarea = obj.getTextArea();
  textarea.textContent = obj.getValue();
  textarea.classList.add('practice-passed');
}

SCMCodeEval.prototype.inConsole = function (value) {
  let consoleOutput = __logs__;

  if (consoleOutput.indexOf(value) === -1)
    throw {message: `The value ${value} is missing from the console output.`}
} 

scmCE = new SCMCodeEval;