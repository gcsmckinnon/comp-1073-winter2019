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

SCM.prototype.checkPattern = function (pattern, obj, message = false) {
  let search = obj.getSearchCursor(pattern);

  if (!search.findNext()) {
    throw {message: (message || "There is likely an issue with your syntax. Please try again.")}
  } else {
    return {from: search.from(), to: search.to(), matches: obj.getValue().match(pattern)}
  }
}

SCM.prototype.isBlock = function (varName, obj) {
  let pattern = new RegExp(`[let|const] ${varName}`, 'g');
  this.checkPattern(pattern, obj, `${varName} is not block scoped. Please correct your syntax.`);
}

SCM.prototype.isConcatenated = function (varName, obj) {
  let pattern = new RegExp(`\\s*\\+\\s*${varName}\\s*(\\+\\s*")?|("\\+)?\\s*${varName}\\s*\\+\\s*`, 'g');
  this.checkPattern(pattern, obj, `${varName} is not concatenated correctly. Please correct your syntax.`);
}

SCM.prototype.isInterpolated = function (expression, obj) {
  let pattern = new RegExp(`$\\{${expression}\\}`, 'g');
  this.checkPattern(pattern, obj, `The expression, (${expression}), is not within the proper interpolation \$\{\} block. Please correct your syntax.`);
}

SCM.prototype.setPass = function (obj, selector = false, message = false) {
  let textarea = obj.getTextArea();
  textarea.textContent = obj.getValue();
  textarea.classList.add('practice-passed');
}

SCM.prototype.inConsole = function (value) {
  let consoleOutput = __logs__;

  if (consoleOutput.indexOf(value) === -1)
    throw {message: `The value ${value} is missing from the console output.`}
}

SCM.prototype.copy2Practice = function (selector, cmObj, content, append = true) {
  let field = document.querySelector(selector);
  if (field.textContent.match(content) === null) {
    if (append)
      field.textContent = `${content}\n\n${field.textContent}`;
    else
      field.textContent = `${field.textContent}\n\n${content}`;
    cmObj.setValue(field.textContent);
  }
}

SCM.prototype.parsePattern = function (pattern, flags = false) {
  let parsed = pattern;

  let lookup = {
    bs: '[let|const]+', // block scope
    os: '\\s*', // optional space
    rs: '\\s+', // requires at least 1 space
    qc: '[\\"|\\\'|\`]', // quote characters
    so: '\;?', // optional semi-colon
    anyR: '.+', // requires at least one text
    anyW: '.*', // any text
    sym: '([a-zA-Z\\_\\$][a-zA-Z\\_0-9]+)', // symbol name
    plag: '\\({os}(({qc}?{anyR}{qc}?)\,?)+{os}\\)', // param or args list
    bvard: '{bs}{rs}{sym}{os}(\=|\;?){os}?', // block variable declaration
    cond: '((if{os}{plag})|(switch{os}{plag}))' // condition checks
  }

  let patternBlocks = pattern.match(/(\{[a-zA-Z0-9]+\})/g);

  if (patternBlocks && patternBlocks.length > 0) {
    for (let block of patternBlocks) {
      let key = block.replace(/\{|\}/gi, '');

      if (typeof parsed === 'string'){
        parsed = parsed.replace(block, lookup[key]);

        // Blocks can contain lookups
        if (parsed.match(/(\{[a-zA-Z0-9]+\})/g)) {
          parsed = this.parsePattern(parsed);
        }
      }
    }
  }
  
  if (flags)
    return new RegExp(parsed, flags.join(', '));
  else
    return new RegExp(parsed);
}

const scm = new SCM;

document.addEventListener("DOMContentLoaded", function () {
  let myStorage = window.localStorage;
  let idCounter = 1;
  CODEMIRRORS = {};

  // Initializing CodeMirror
  let textareas = document.querySelectorAll('textarea.practice');
  for (let cm of textareas) {
    // add an identifier to each practice block on load
    cm.id = `p${idCounter}`;

    if (myStorage[`p${idCounter}`])
      cm.textContent = myStorage[`p${idCounter}`];

    idCounter++;

    // initialize codemirror
    let cmObj = CodeMirror.fromTextArea(cm, {
      lineNumbers: true,
      mode: "javascript",
      theme: "duotone-light"
    });

    CODEMIRRORS[cm.id] = cmObj;

    // create an evaluation button
    let button = document.createElement('button');
    button.classList.add('practice', 'evaluate');
    button.textContent = "Execute";

    // store our value in local storage
    button.addEventListener('click', function () {
      console.clear();
      myStorage.setItem(cm.id, cmObj.getValue("\n"));

      if (window[cm.id] && typeof window[cm.id] === "function") {
        let scmeval = new Evaluator;
        scmeval.evaluate(cmObj.getValue());

        window[cm.id].env = scmeval.env;
        window[cm.id].code = cmObj.getValue();
        window[cm.id].codeFormatted = cmObj.getValue("\n");
        window[cm.id].cmObj = cmObj;

        try {
          window[cm.id]();
        } catch (e) {
          console.log("ERROR:", e.message);
        }
      }
    });

    cm.parentNode.append(button);
  }

  // Get the lab
  let getCode = document.querySelector('#printCode');
  const codeoutput = document.querySelector('#codeoutput');

  getCode.addEventListener('click', function () {
    textareas.forEach(function (ele) {
      codeoutput.append(myStorage[ele.id]);
    });
  });
});