// Our Tests
function p1 () {
  // Check if variables are defined and correct datatype
  scm.isNumber('age', p1.env.age);
  scm.isBlock('age', p1.cmObj);
  scm.isString('name', p1.env.name);
  scm.isBlock('name', p1.cmObj);
  scm.isString('bio', p1.env.bio);
  scm.isBlock('bio', p1.cmObj);

  // Check the bio pattern
  scm.checkPattern(/let bio\s*=\s*/g, p1.cmObj, 'You have a syntax error. Cannot evaluate bio.');
  scm.isConcatenated('name', p1.cmObj);
  scm.isConcatenated('age', p1.cmObj);

  scm.setPass(p1.cmObj);

  // Let's move your variables to the next block, p2
  scm.copy2Practice('textarea#p2', CODEMIRRORS.p2, `let age = ${p1.env.age};\nlet name = "${p1.env.name}";`);
}

function p2 () {
  scm.isNumber('age', p2.env.age);
  scm.isBlock('age', p2.cmObj);
  scm.isString('name', p2.env.name);
  scm.isBlock('name', p2.cmObj);
  scm.isString('bio', p2.env.bio);
  scm.isBlock('bio', p2.cmObj);

  // Check the bio pattern
  scm.checkPattern(/let\s+bio\s*=\s*\`.+\`\s*\;/g, p2.cmObj, 'You have a syntax error. Cannot evaluate bio.');
  // scm.checkPattern(//g)

  scm.setPass(p2.cmObj);

  // Next question setup
  scm.copy2Practice('textarea#p3', CODEMIRRORS.p3, `let age = "${p2.env.age}";`);

  // Let's move your variables to the next block, p2
  scm.copy2Practice('textarea#p6', CODEMIRRORS.p6, `let name = "${p2.env.name}";`);
}

function p3 () {
  scm.isString('age', p3.env.age);
  scm.isBlock('age', p3.cmObj);
  scm.isNumber('agePlus10', p3.env.agePlus10);
  scm.isBlock('agePlus10', p3.cmObj);

  scm.checkPattern(/String\(\s*true\s*\)/g, p3.cmObj, 'You failed to cast the boolean value true to a string.');
  scm.inConsole(p3.env.agePlus10);

  scm.setPass(p3.cmObj);
}

let p4Tests = {};
function p4 () {
  let step1pos = scm.checkPattern(scm.parsePattern('alert{plag}{so}'), p4.cmObj, 'You are missing alert() or you have used incorrect syntax.');

  let step2pos = scm.checkPattern(scm.parsePattern('{bvard}confirm{plag}'), p4.cmObj, 'You are missing confirm() or you have used incorrect syntax. You must store the response in a variable.');

  let respVar = step2pos.matches[1];
  let resp = p4.env[respVar.trim()];

  let step3pos = scm.checkPattern(scm.parsePattern('{bvard}prompt{plag}'), p4.cmObj, 'You are missing prompt() or you have used incorrect syntax. You must store the response in a variable.');

  let pRespVar = step3pos.matches[1];
  let pResp = p4.env[pRespVar.trim()];

  // double check there's an if or switch condition
  let condChk = scm.checkPattern(scm.parsePattern('{cond}'), p4.cmObj, `You need some form of a condition check comparing your variable, ${respVar}.`);

  console.log(resp, pResp);
  // If confirmation is true and there's a new message
  if (resp && pResp) {
    console.log("P4 Test 1 Passed");
    p4Tests.test1 = true;
  } else if (!resp && !pResp) {
    // The resp is false and there is no message
    console.log("P4 Test 2 Passed");
    p4Tests.test2 = true;
  } else {
    // Else there's an error
    throw {message: 'You should not be able to enter a new message if your choice was false.'}
  }

  // If both tests have passed then you pass
  if (p4Tests.test1 && p4Tests.test2) {
    scm.setPass(p4.cmObj);
  } else if (p4Tests.test1 || p4Tests.test2) {
    console.log("You have passed one of the tests.");
  }
}


function p5 () {
  scm.isNumber('x', p5.env.x);
  scm.isBlock('x', p5.cmObj);
  scm.checkPattern(/Math\.sqrt\(\s*\d+\s*\)/, p5.cmObj, `Your square root syntax is incorrect.`);
  scm.isValue(p5.env.x, 8);

  scm.isNumber('y', p5.env.y);
  scm.isBlock('y', p5.cmObj);
  scm.checkPattern(/Math\.floor\(\s*\d+\.\d+\s*\)/, p5.cmObj, `Your rounding down syntax is incorrect.`);
  scm.isValue(p5.env.y, 10);

  scm.isNumber('w', p5.env.w);
  scm.isBlock('w', p5.cmObj);
  scm.checkPattern(/Math\.ceil\(\s*\d+\.\d+\s*\)/, p5.cmObj, `Your rounding up syntax is incorrect.`);
  scm.isValue(p5.env.w, 11);

  scm.isNumber('u', p5.env.u);
  scm.isBlock('u', p5.cmObj);
  scm.checkPattern(/Math\.round\(\s*\d+\.\d+\s*\)/, p5.cmObj, `Your rounding syntax is incorrect.`);
  scm.isValue(p5.env.u, 168);

  scm.isNumber('t', p5.env.t);
  scm.isBlock('t', p5.cmObj);
  scm.checkPattern(/Math\.random\(\s*\)/, p5.cmObj, `Your random number syntax is incorrect.`);
  scm.isRange(p5.env.t, 0, 1);

  scm.setPass(p5.cmObj);
}

function p6 () {
  scm.isString('upcase', p6.env.upcase);
  scm.isBlock('upcase', p6.cmObj);
  scm.checkPattern(/\.toUpperCase\(\)/, p6.cmObj, `You're missing the correct syntax to uppercase the value.`);
  scm.isValue(p6.env.upcase, p6.env.upcase.toUpperCase());

  scm.isString('downcase', p6.env.downcase);
  scm.isBlock('downcase', p6.cmObj);
  scm.checkPattern(/\.toLowerCase\(\)/, p6.cmObj, `You're missing the correct syntax to lowercase the value.`);
  scm.isValue(p6.env.downcase, p6.env.downcase.toLowerCase());

  scm.isString('trim', p6.env.trim);
  scm.isBlock('trim', p6.cmObj);
  scm.checkPattern(/\.trim\(\)/, p6.cmObj, `You're missing the correct syntax to trim the value.`);
  scm.isValue(p6.env.trim, p6.env.trim.trim());

  scm.isArray('matches', p6.env.matches);
  scm.isBlock('matches', p6.cmObj);

  scm.checkPattern(scm.parsePattern('\\.match\\({os}{qc}world{qc}{os}\\)'), p6.cmObj, `You're missing the correct syntax to trim the value.`);
  scm.isValue(p6.env.matches[0], p6.env.stmnt.match("world")[0]);

  scm.setPass(p6.cmObj);
}


function p7 () {
  scm.isFunction('greeting', p7.env.greeting);
  p7.env.greeting('name');
  scm.inConsole('Hello, name', p3.cmObj);
  scm.checkPattern(/function\s+greeting\s*\(\s*name\s*\)/, p7.cmObj, `Your named function syntax for 'greeting' is incorrect. Please fix it.`);

  scm.isFunction('notify', p7.env.notify);
  p7.env.notify('message');
  scm.inConsole('The Message: message');
  scm.checkPattern(/let\s+notify\s*=\s*function\s+\(\s*message\s*\)/, p7.cmObj, `Your anonymous function syntax for 'notify' is incorrect. Please fix it.`);

  scm.setPass(p7.cmObj);
}


function p8 () {
  scm.checkPattern(/greeting\(.+\)/, p8.cmObj, `Your function call syntax is incorrect.`);
  scm.test((__logs__.length > 0), false, 'You have modified the function in some way and the console logging is not occuring.');

  scm.checkPattern(/notify\(.+\)/, p8.cmObj, `Your function call syntax is incorrect.`);
  scm.test((__logs__.length > 0), false, 'You have modified the function in some way and the console logging is not occuring.');

  scm.setPass(p8.cmObj);
}


function p9 () {
  scm.isArray('myNewArr', p9.env.myNewArr, `There's an issue with your function. It isn't returning the correct data type`);
  scm.test((p9.env.myNewArr.length > 0), false, 'You function did not work or you failed to call it.');
  scm.setPass(p9.cmObj);
}

function p10 () {
  scm.isNumber('sum', p10.env.sum);
  scm.isBlock('sum', p10.cmObj);

  scm.checkPattern(/nums\.reduce\(\s*function\s*\(.+\, .+\).*((\n.*)+)?\s*return .+\+.+/, p10.cmObj, `There is an issue with your reduce function. Please check your syntax.`);

  scm.isValue(p10.env.sum, 561);

  scm.setPass(p10.cmObj);
}