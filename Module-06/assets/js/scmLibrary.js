// Enables all tooltips from Bootstrap
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});

// Local Storage
const myStorage = window.localStorage;

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
SCM.prototype.isType = function (varName, variable, type, error) {
  if (variable === undefined)
    throw {message: (error || `${varName} is of type undefined`)}

  if (type === 'array' && variable.constructor.name === "Array")
    return
  
  if (typeof variable !== type) {
    if (variable.constructor.name === "Array")
      throw {message: (error || `${varName} is not of type ${type}. It is of type ${variable.constructor.name.toLowerCase()}`)};
    else
      throw {message: (error || `${varName} is not of type ${type}. It is of type ${typeof variable}.`)};
  }
}

SCM.prototype.isString = function (varName, variable, error = false) {
  this.isType(varName, variable, 'string', error);
}

SCM.prototype.isNumber = function (varName, variable, error = false) {
  this.isType(varName, variable, 'number', error);
}

SCM.prototype.isBoolean = function (varName, variable, error = false) {
  this.isType(varName, variable, 'boolean', error);
}

SCM.prototype.isArray = function (varName, variable, error = false) {
  this.isType(varName, variable, 'array', error);
}

SCM.prototype.isObject = function (varName, variable, error = false) {
  this.isType(varName, variable, 'object', error);
}

SCM.prototype.isFunction = function (varName, variable, error = false) {
  this.isType(varName, variable, 'function', error);
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

SCM.prototype.matchesPattern = function (variable, pattern, error = false) {
  this.test((variable.match(pattern)), false, (error || `${variable} does not match ${pattern}.`));
}

SCM.prototype.isValue = function (variable, value, error = false) {
  if (variable !== value)
    throw {message: (error || `${variable} does not equal the expected value of ${value}`)}
}

SCM.prototype.hasValue = function (variable, error = false) {
  this.test((variable !== undefined), false, (error || `This does not have a value.`))
}

SCM.prototype.isRange = function (variable, from, to) {
  if (variable < from || variable > to)
    throw {message: `${variable} is outside the range of ${from} to ${to}`}
}

SCM.prototype.test = function (condition, success, error, selector = false) {
  if (condition && selector) this.selectAndServe(selector, success);
  if (!condition) throw {message: error}
}

SCM.prototype.exists = function (variableName, obj) {
  for (let prop in obj) {
    if (prop === variableName) return;
  }
  
  throw {message: `${variableName} is undefined.`};
}

SCM.prototype.checkPattern = function (pattern, obj, message = false) {
  let search = obj.getSearchCursor(pattern);
  let resp = [];
  let res;

  while (res = search.findNext()) {
    resp.push({from: search.from(), to: search.to(), matches: res});
  }

  if (resp.length === 0) throw{message: (message || 'Your syntax is incorrect.')}

  if (resp.length === 1) return resp[0]; // backwards compatibility
  return resp;
}

SCM.prototype.isBlock = function (varName, obj) {
  let pattern = new RegExp(`[let|const] ${varName}`, 'g');
  this.checkPattern(pattern, obj, `${varName} is not block scoped. Please correct your syntax.`);
}

SCM.prototype.isConstant = function (varName, obj) {
  let pattern = this.parsePattern(`const{rs}${varName}`);
  this.checkPattern(pattern, obj, `${varName} is not a constant (immutable/block scoped).`);
}

SCM.prototype.isGlobal = function (varName, obj) {
  let pattern = this.parsePattern(`^{os}name`);
  this.checkPattern(pattern, obj, `${varName} is not globally scoped.`);
}

SCM.prototype.isFunctionalScope = function (varName, obj) {
  let pattern = this.parsePattern(`var{rs}${varName}`);
  this.checkPattern(pattern, obj, `${varName} is not functionally scoped. Please correct your syntax.`);
}

SCM.prototype.isBlockMutable = function (varName, obj) {
  let pattern = this.parsePattern(`let{rs}${varName}`);
  this.checkPattern(pattern, obj, `${varName} is not mutable/block scoped. Please correct your syntax.`);
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

SCM.prototype.fieldHasValue = function (selector, value, error = false) {
  let ele = document.querySelector(selector);

  if (value === undefined && ele.value === 'undefined') return;
  if (value === undefined) {
    this.test((ele.value === 'undefined'), false, (error || `Your value, ${ele.value}, is incorrect. The value should be undefined.`));
  }

  console.log(ele.value.toString(), value.toString(), (ele.value.toString() === value.toString()));

  this.test((ele.value.toString() === value.toString()), false, (error || `Your value, ${ele.value}, is incorrect. The value should be ${value}.`));
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
    bs: '(?:(?:let|const)\\s+)', // block scope
    fs: 'var', // function scope
    os: '\\s*', // optional space
    rs: '\\s+', // requires at least 1 space
    qc: '[\\"|\\\'|\\`]', // quote characters
    so: '\\;?', // optional semi-colon
    anyR: '.+', // requires at least one text
    anyW: '.*', // any text
    sym: '(?:\\s*[a-zA-Z\\_\\$]([a-zA-Z\\_0-9]+)?\\s*)', // symbol name
    plag: '\\({os}(({qc}?{anyR}{qc}?)\,?)+{os}\\)', // param or args list
    bvard: '{bs}{rs}{sym}{os}(\\=|\\;?){os}?', // block variable declaration
    gvard: '{fs}{rs}{sym}({eq}|({os}{semiO}))', // function scope variable declarion
    cond: '((if{os}{plag})|(switch{os}{plag}))', // condition checks
    eq: '(?:\\s*\\=\\s*)',
    semiO: '\\;?',
    numR: '\\d+',
    funcNamed: 'function{rs}{sym}{os}{plag}',
    value: '(?:{vStr}|{vBool}|{sym}|{vArr}|{vObj}|{vNum})',
    vStr: '(?:{qc}.*{qc})',
    vNum: '(?:(?:(?:\\-?)(?:\\d*)(?:\\.?)(?:\\d*)))',
    vBool: '(?:true|false)',
    vArr: '(?:\\[(?:.+)(\\,?{os})\\])',
    vObj: '(?:\\{(?:.+\\:.+(?:\\,{os})?)*\\})',
    varCapt: '(?:{bs}|{fs})(?<variable>{sym})',
    namedFuncCapt: '(?:function{rs}(?<func>{sym}){os}\((?<params>.+)\){os})'
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
  let idCounter = 1;
  CODEMIRRORS = {};

  // Initializing CodeMirror
  let textareas = document.querySelectorAll('textarea.practice');
  for (let cm of textareas) {
    // add an identifier to each practice block on load
    if (MODULE)
      cm.id = `m${MODULE}p${idCounter}`;
    else
      cm.id = `p${idCounter}`;

    if (myStorage[cm.id])
      cm.textContent = myStorage[cm.id];

    idCounter++;

    // initialize codemirror
    let cmObj = CodeMirror.fromTextArea(cm, {
      lineNumbers: true,
      mode: "javascript",
      theme: "duotone-light",
      autoCloseBrackets: true,
      lineWrapping: true
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
        let str = `//# sourceURL=${cm.id}.js\n`;
        str += cmObj.getValue();

        console.evaluatedString = str;
        scmeval.evaluate(str);

        window[cm.id].env = scmeval.env;
        window[cm.id].code = cmObj.getValue();
        window[cm.id].codeFormatted = cmObj.getValue("\n");
        window[cm.id].cmObj = cmObj;

        try {
          window[cm.id]();
        } catch (e) {
          console.log("ERROR:", e.message);
        }
      } else {
        console.log(`Couldn't find function: ${cm.id}`);
      }
    });

    cm.parentNode.append(button);
  }

  let studentResponses = document.querySelectorAll('input.student-response');
  for (let response of studentResponses) {
    let name = response.name;

    if (myStorage[name])
      response.value = myStorage[name];
  }

  // Get the lab
  console.log('code button');
  let getCode = document.querySelector('#printCode');
  const codeoutput = document.querySelector('#codeoutput');

  getCode.addEventListener('click', function () {
    console.log("clicked");
    codeoutput.append(`\n`);
    textareas.forEach(function (ele) {
      codeoutput.append(myStorage[ele.id]);
    });
  });
});