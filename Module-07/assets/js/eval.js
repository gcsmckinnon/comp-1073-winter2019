// http://2ality.com/2012/07/evaluator-via-eval.html
function Evaluator() {
  this.env = {};
}

Evaluator.prototype.evaluate = function (str) {
  str = this.rewriteDeclarations(str);

  var __environment__ = this.env;  // (1)
  with (__environment__) {  // (2)
    return eval(str);
  }
};

Evaluator.prototype.rewriteDeclarations = function (str) {
  // Prefix a newline so that search and replace is simpler
  str = "\n" + str;

  str = str.replace(/\n(let|const|var)\s*(\w+)\s*\;/g, "\n__environment__.$2 = undefined;");

  str = str.replace(/\n(\w+)\s*=/g,
                    "\n__environment__.$1 =");  // (3)
  str = str.replace(/\nvar\s+(\w+)\s*=/g,
                    "\n__environment__.$1 =");  // (3)
  str = str.replace(/\nconst\s+(\w+)\s*=/g,
                    "\n__environment__.$1 =");  // (3)
  str = str.replace(/\nlet\s+(\w+)\s*=/g,
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

// onerror function
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.stack = {
    message: msg,
    source: url,
    line: lineNo || 2,
    char: columnNo,
    error: error
  }

  console.log(`${console.stack.message} at ${Number(console.stack.line) - 2}:${console.stack.char} (${console.stack.source})`);

  return true;
}

// Utilities
const drag = function (e) {
  e.dataTransfer.setData('text', e.target.id);
}

const drop = function (e) {
  let data = e.dataTransfer.getData('text');
  e.target.parentNode.insertBefore(document.querySelector(`#${data}`), e.target.nextSibling);
  e.preventDefault();
}

const scramble = function (listItemSelector) {
  const items = document.querySelectorAll(listItemSelector);
  const parent = items[0].parentNode;
  parent.ondragover = (e) => e.preventDefault();

  let startingOrder = [];

  for (const item of items) {
    // set their ids
    item.id = `_${uuid(8)}`;
    startingOrder.push(item.id);

    // add the draggable
    item.draggable = true;
    item.ondragstart = drag;
    item.ondrop = drop;
  }

  let newOrder = shuffle(startingOrder.slice(0));

  for (let id of newOrder) {
    parent.appendChild(document.querySelector(`#${id}`));
  }

  return {origOrder: startingOrder, newOrder: newOrder};
}

const uuid = function (len = 32) {
  var buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length,
    length = len || 32;
      
  for (var i = 0; i < length; i++) {
    buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
  }
  
  return buf.join('');
}

const shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const randomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const randomArrEle = function (arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

const randomNumberArray = function (amt = 10, range = [1, 10]) {
  let randArr = [];

  for (let i = 0; i < amt; i++) {
    randArr.push(randomInt(range[0], range[1]));
  }

  return randArr;
}

Array.prototype.to_s = function () {
  return JSON.stringify(this).replace(/\,/g, ', ');
}

const randomArrSet = function (arr, amt) {
  let tmp = arr.slice(0);
  let popped = [];

  while (tmp.length > 0 && popped.length < amt) {
    popped.push(tmp.splice(randomInt(0, tmp.length), 1));
  }

  return popped.flat();
}

const randomArraySetDestructive = function (arr, amt = 1) {
  let popped = [];

  while (arr.length > 0 && popped.length < amt) {
    popped.push(arr.splice(randomInt(0, arr.length), 1));
  }

  return popped.flat();
}