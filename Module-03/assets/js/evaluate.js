// Our Tests
function p1 () {
  // Check if variables are defined and correct datatype
  scm.isNumber('age', p1.env.age);
  scmCE.isBlock('age', p1.cmObj);
  scm.isString('name', p1.env.name);
  scmCE.isBlock('name', p1.cmObj);
  scm.isString('bio', p1.env.bio);
  scmCE.isBlock('bio', p1.cmObj);

  // Check the bio pattern
  scmCE.checkPattern(/let bio\s*=\s*/g, p1.cmObj, 'You have a syntax error. Cannot evaluate bio.');
  scmCE.isConcatenated('name', p1.cmObj);
  scmCE.isConcatenated('age', p1.cmObj);

  scmCE.setPass(p1.cmObj);

  // Let's move your variables to the next block, p2
  let p2TA = document.querySelector('textarea#p2');
  p2TA.textContent = `let age = ${p1.env.age};\nlet name = "${p1.env.name}";\n\n${p2TA.textContent}`;
  CODEMIRRORS.p2.setValue(p2TA.textContent);
}

function p2 () {
  scm.isNumber('age', p2.env.age);
  scmCE.isBlock('age', p2.cmObj);
  scm.isString('name', p2.env.name);
  scmCE.isBlock('name', p2.cmObj);
  scm.isString('bio', p2.env.bio);
  scmCE.isBlock('bio', p2.cmObj);

  // Check the bio pattern
  scmCE.checkPattern(/let bio\s*=\s*\`.+\`\s*\;/g, p2.cmObj, 'You have a syntax error. Cannot evaluate bio.');
  // scmCE.checkPattern(//g)

  scmCE.setPass(p2.cmObj);

  // Next question setup
  let p3TA = document.querySelector('textarea#p3');
  p3TA.textContent = `let age = "${p2.env.age}";\n\n${p3TA.textContent}`;
  CODEMIRRORS.p3.setValue(p3TA.textContent);

  // Let's move your variables to the next block, p2
  let p6TA = document.querySelector('textarea#p6');
  p6TA.textContent = `let name = "${p2.env.name}";\n\n${p6TA.textContent}`;
  CODEMIRRORS.p6.setValue(p6TA.textContent);
}

function p3 () {
  scm.isString('age', p3.env.age);
  scmCE.isBlock('age', p3.cmObj);
  scm.isNumber('agePlus10', p3.env.agePlus10);
  scmCE.isBlock('agePlus10', p3.cmObj);

  scmCE.checkPattern(/String\(\s*true\s*\)/g, p3.cmObj, 'You failed to cast the boolean value true to a string.');
  scmCE.inConsole(p3.env.agePlus10);

  scmCE.setPass(p3.cmObj);
}

let p4Tests = {};
function p4 () {
  let step1pos = scmCE.checkPattern(/alert\(\s*\".+\"\s*\)\s*\;/, p4.cmObj, 'You are missing alert() or you have used incorrect syntax.');

  let step2pos = scmCE.checkPattern(/let (.+)\s*\=\s*confirm\(\s*\".+\"\s*\)\s*\;/, p4.cmObj, 'You are missing confirm() or you have used incorrect syntax. You must store the response in a variable.');

  let respVar = step2pos.matches[1];
  let resp = p4.env[respVar.trim()];

  let step3pos = scmCE.checkPattern(/let (.+)\s*\=\s*prompt\(\s*\".+\"\s*\)\s*\;/, p4.cmObj, 'You are missing prompt() or you have used incorrect syntax. You must store the response in a variable.');

  let pRespVar = step3pos.matches[1];
  let pResp = p4.env[pRespVar.trim()];

  // double check there's an if or switch condition
  let condChk = scmCE.checkPattern(/(if\s*\(.*(choice).*\))|(switch\s*\(.*choice.*\))/, p4.cmObj, `You need some form of a condition check comparing your variable, ${respVar}.`);

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
    scmCE.setPass(p4.cmObj);
  } else if (p4Tests.test1 || p4Tests.test2) {
    console.log("You have passed one of the tests.");
  }
}


function p5 () {
  scm.isNumber('x', p5.env.x);
  scmCE.isBlock('x', p5.cmObj);
  scmCE.checkPattern(/Math\.sqrt\(\s*\d+\s*\)/, p5.cmObj, `Your square root syntax is incorrect.`);
  scm.isValue(p5.env.x, 8);

  scm.isNumber('y', p5.env.y);
  scmCE.isBlock('y', p5.cmObj);
  scmCE.checkPattern(/Math\.floor\(\s*\d+\.\d+\s*\)/, p5.cmObj, `Your rounding down syntax is incorrect.`);
  scm.isValue(p5.env.y, 10);

  scm.isNumber('w', p5.env.w);
  scmCE.isBlock('w', p5.cmObj);
  scmCE.checkPattern(/Math\.ceil\(\s*\d+\.\d+\s*\)/, p5.cmObj, `Your rounding up syntax is incorrect.`);
  scm.isValue(p5.env.w, 11);

  scm.isNumber('u', p5.env.u);
  scmCE.isBlock('u', p5.cmObj);
  scmCE.checkPattern(/Math\.round\(\s*\d+\.\d+\s*\)/, p5.cmObj, `Your rounding syntax is incorrect.`);
  scm.isValue(p5.env.u, 168);

  scm.isNumber('t', p5.env.t);
  scmCE.isBlock('t', p5.cmObj);
  scmCE.checkPattern(/Math\.random\(\s*\)/, p5.cmObj, `Your random number syntax is incorrect.`);
  scm.isRange(p5.env.t, 0, 1);

  scmCE.setPass(p5.cmObj);
}

function p6 () {
  scm.isString('upcase', p6.env.upcase);
  scmCE.isBlock('upcase', p6.cmObj);
  scmCE.checkPattern(/\.toUpperCase\(\)/, p6.cmObj, `You're missing the correct syntax to uppercase the value.`);
  scm.isValue(p6.env.upcase, p6.env.upcase.toUpperCase());

  scm.isString('downcase', p6.env.downcase);
  scmCE.isBlock('downcase', p6.cmObj);
  scmCE.checkPattern(/\.toLowerCase\(\)/, p6.cmObj, `You're missing the correct syntax to lowercase the value.`);
  scm.isValue(p6.env.downcase, p6.env.downcase.toLowerCase());

  scm.isString('trim', p6.env.trim);
  scmCE.isBlock('trim', p6.cmObj);
  scmCE.checkPattern(/\.trim\(\)/, p6.cmObj, `You're missing the correct syntax to trim the value.`);
  scm.isValue(p6.env.trim, p6.env.trim.trim());

  scm.isArray('matches', p6.env.matches);
  scmCE.isBlock('matches', p6.cmObj);
  scmCE.checkPattern(/\.match\(\s*\"world\"\s*\)/, p6.cmObj, `You're missing the correct syntax to trim the value.`);
  scm.isValue(p6.env.matches[0], p6.env.stmnt.match("world")[0]);

  scmCE.setPass(p6.cmObj);
}


function p7 () {
  scm.isFunction('greeting', p7.env.greeting);
  p7.env.greeting('name');
  scmCE.inConsole('Hello, name', p3.cmObj);
  scmCE.checkPattern(/function \s*greeting\s*\(\s*name\s*\)/, p7.cmObj, `Your named function syntax for 'greeting' is incorrect. Please fix it.`);

  scm.isFunction('notify', p7.env.notify);
  p7.env.notify('message');
  scmCE.inConsole('The Message: message');
  scmCE.checkPattern(/let \s*notify\s*=\s*function \s*\(\s*message\s*\)/, p7.cmObj, `Your anonymous function syntax for 'notify' is incorrect. Please fix it.`);

  scmCE.setPass(p7.cmObj);
}


function p8 () {
  scmCE.checkPattern(/\s*greeting\(.+\)/, p8.cmObj, `Your function call syntax is incorrect.`);
  scm.test((__logs__.length > 0), false, 'You have modified the function in some way and the console logging is not occuring.');

  scmCE.checkPattern(/\s*notify\(.+\)/, p8.cmObj, `Your function call syntax is incorrect.`);
  scm.test((__logs__.length > 0), false, 'You have modified the function in some way and the console logging is not occuring.');

  scmCE.setPass(p8.cmObj);
}


function p9 () {
  scm.isArray('myNewArr', p9.env.myNewArr, `There's an issue with your function. It isn't returning the correct data type`);
  scm.test((p9.env.myNewArr.length > 0), false, 'You function did not work or you failed to call it.');
  scmCE.setPass(p9.cmObj);
}

function p10 () {
  scm.isNumber('sum', p10.env.sum);
  scmCE.isBlock('sum', p10.cmObj);

  scmCE.checkPattern(/nums\.reduce\(\s*function\s*\(.+\, .+\).*((\n.*)+)?\s*return .+\+.+/, p10.cmObj, `There is an issue with your reduce function. Please check your syntax.`);

  scm.isValue(p10.env.sum, 561);

  scmCE.setPass(p10.cmObj);
}