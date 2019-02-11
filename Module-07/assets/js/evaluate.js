const MODULE = 7;


// Midterm 1

// Question 1 - Console
// Setup
(function () {
  let scores = [];
  for (let i = 0; i < 30; i++) {
    scores.push(randomInt(1, 32600));
  }
  document.querySelector('textarea.practice').prepend(`const scores = [${scores.join(', ')}];\n\n`);
})();

function m7p1 () {
  
  let pat = scm.parsePattern(`^{os}debugger{os}`);
  scm.checkPattern(pat, m7p1.cmObj, `You are missing your breakpoint keyword.`);

  scm.hasValue(m7p1.env.sumTotal, `sumTotal is undefined`);
  scm.isValue(m7p1.env.sumTotal, m7p1.env.scores.reduce((a, b) => a + b), `sumTotal is not the same value as sum`);

  scm.setPass(m7p1.cmObj);
}


// Question 2 - Variables
function m7p2 () {
  scm.isFunctionalScope('x', m7p2.cmObj);
  scm.isBoolean('x', m7p2.env.x);

  scm.isConstant('HST', m7p2.cmObj);
  scm.isNumber('HST', m7p2.env.HST);

  scm.isGlobal('name', m7p2.cmObj);
  scm.isString('name', m7p2.env.name);

  scm.isBlockMutable('lifeTheUniverseAndEverything', m7p2.cmObj);
  scm.isNumber('lifeTheUniverseAndEverything', m7p2.env.lifeTheUniverseAndEverything);

  if (m7p2.env.lifeTheUniverseAndEverything === 42)
    console.log("***CONGRATULATIONS*** You would receive a bonus mark for that if this wasn't a practice test.");

  if (m7p2.cmObj.getValue().match(/window\.child/))
    console.log("***CONGRATULATIONS*** But this is a practice test so no bonus mark! MUHAHAHAHAHA");

  scm.setPass(m7p2.cmObj);
}


function m7p3 () {
  ['x', 'y', 'w'].forEach(v => {
    scm.isBlockMutable(v, m7p3.cmObj);
    scm.isBoolean(v, m7p3.env[v]);
  });

  ({x, y, w} = m7p3.env);
  scm.isValue(x, true, `x is not true`);
  scm.isValue(y, false, `y is not false`);
  scm.isValue(w, true, `w is not true`);

  const pw = m7p3.cmObj.getValue();
  let pat1 = scm.parsePattern(`Number\\({os}\\d+{os}\\)`);
  let pat2 = scm.parsePattern(`String\\({os}{qc}\\d+{qc}{os}\\)`);
  let pat3 = scm.parsePattern(`Number\\({os}\\d+{os}\\)`);
  let pat4 = scm.parsePattern(`String\\({os}{qc}\\d+{qc}{os}\\)`);

  let matches = ((pw.match(pat1) || pw.match(pat2)) && (pw.match(pat3) || (pw.match(pat4))));

  scm.test(matches, false, `You must use casting to make w equal true`);

  scm.setPass(m7p3.cmObj);
}

// Setup
window.addEventListener('load', () => {
  if (!(CODEMIRRORS.m7p4.getValue().match(/let cost/)))
    CODEMIRRORS.m7p4.setValue(`let cost = ${randomInt(1, 100)};\n\n${CODEMIRRORS.m7p4.getValue()}`);
});

function m7p4 () {
  let pat = scm.parsePattern(`if{os}\\({os}cost{os}(\\>|\\>\\=){os}50\\)`);
  scm.checkPattern(pat, m7p4.cmObj, `You are missing your if statement or the syntax is incorrect.`);

  pat = scm.parsePattern(`else if{os}\\({os}cost{os}(\\>|\\>\\=){os}30\\)`);
  scm.checkPattern(pat, m7p4.cmObj, `You are missing your else if statement or the syntax is incorrect.`);

  pat = scm.parsePattern(`(else({os}\\{)?$)|(else{rs}.*haggle)`);
    scm.checkPattern(pat, m7p4.cmObj, `You are missing your else statement or the syntax is incorrect.`);

  const haggle = m7p4.env.haggle;
  scm.isNumber('haggle', haggle);

  let shouldBe = 0;

  if (m7p4.env.cost > 50) {
    shouldBe = 0.3;
  } else if (m7p4.env.cost > 30) {
    shouldBe = 0.2;
  } else {
    shouldBe = 0.1;
  }

  scm.isValue(haggle, shouldBe, `haggle should be ${shouldBe} not ${haggle}.`);

  scm.setPass(m7p4.cmObj);
}


window.addEventListener('load', () => {
  let str = '';
  if (!(CODEMIRRORS.m7p5.getValue().match(/let price/)))
    str += `let price = ${randomInt(1, 100)}.${randomInt(10, 99)};\n`
  if (!(CODEMIRRORS.m7p5.getValue().match(/let service/)))
    str += `let service = '${randomArrEle(['terrible', 'meh', 'good', 'fantastic', 'stellar'])}';`
  
  if (str !== '')
    CODEMIRRORS.m7p5.setValue(`${str}\n\n${CODEMIRRORS.m7p5.getValue()}`);
});

function m7p5 () {
  let pat = scm.parsePattern(`switch{os}\\({os}service{os}\\)`);
  scm.checkPattern(pat, m7p5.cmObj, `Your opening switch syntax is incorrect.`);

  for (let service of ['stellar', 'fantastic', 'good', 'meh']) {
    let pat = scm.parsePattern(`case{os}{qc}${service}{qc}{os}\\:`);
    scm.checkPattern(pat, m7p5.cmObj, `You are missing a case for ${service}.`);
  }

  scm.isNumber('tip', m7p5.env.tip);

  let tip;
  switch (m7p5.env.service) {
    case 'stellar':
      tip = 0.3;
      break;
    case 'fantastic':
      tip = 0.2;
      break;
    case 'good':
      tip = 0.15;
      break;
    case 'meh':
      tip = 0.1;
      break;
    default:
      tip = -0.5;
      break;
  }

  scm.isValue(m7p5.env.tip, tip, `Your switch is incorrect or your missing break statements. The final value of tip should be ${tip} not ${m7p5.env.tip}`);

  scm.setPass(m7p5.cmObj);
}


function m7p6 () {
  scm.isArray('singleArr', m7p6.env.singleArr, `singleArr is not an Array`);
  scm.isValue(m7p6.env.singleArr.length, 3, `singleArr does not have 3 elements`);

  scm.isArray('multiArr', m7p6.env.multiArr, `multiArr is not an Array`);
  scm.isValue(m7p6.env.multiArr.length, 2, `multiArr does not have 2 elements`);

  scm.isArray('multiArr[0]', m7p6.env.multiArr[0], `multiArr[0] is not an array`);
  scm.isArray('multiArr[1]', m7p6.env.multiArr[1], `multiArr[1] is not an array`);

  scm.setPass(m7p6.cmObj);
}


// Setup
window.addEventListener('load', () => {
  let str = "";

  function genArr (amt = 5) {
    let arr = [];
    for (let i = 0; i < randomInt(3, amt); i++) {
      arr.push(randomInt(1, 999));
    }
    return arr;
  }

  let count = 1;
  if (!(CODEMIRRORS.m7p7.getValue().match(/let singleArr/))) {
    let arr = genArr(10);
    str += `let singleArr = [${arr.join(', ')}];`;

    CODEMIRRORS.m7p7.singleArrVals = [];
    while (CODEMIRRORS.m7p7.singleArrVals.length < 3) {
      let tmp = randomArrEle(arr);

      if (CODEMIRRORS.m7p7.singleArrVals.includes(tmp)) continue;
      CODEMIRRORS.m7p7.singleArrVals.push(tmp);

      str += `\n\/\/Step ${count}: Using array indices, access and store the value ${tmp} in the following variable\nlet v${count};\n\n`;
      count++;
    }
    myStorage.singleArrVals = CODEMIRRORS.m7p7.singleArrVals;
  }

  if (!(CODEMIRRORS.m7p7.getValue().match(/let multiArr/))) {
    let arr = [
      genArr(5),
      [
        genArr(5),
        [
          genArr(5),
          genArr(5)
        ],
        genArr(5)
      ],
      genArr(5)
    ];
    str += `\nlet multiArr = ${(JSON.stringify(arr)).replace(/\,/g, ', ')};`;

    CODEMIRRORS.m7p7.multiArrVals = [];
    while (CODEMIRRORS.m7p7.multiArrVals.length < 3) {
      let tmp = randomArrEle(arr.flat(3));

      if (CODEMIRRORS.m7p7.multiArrVals.includes(tmp)) continue;
      CODEMIRRORS.m7p7.multiArrVals.push(tmp);

      str += `\n\/\/Step ${count}: Using array indices, access and store the value ${tmp} in the following variable\nlet v${count};\n\n`;
      count++;
    }
    myStorage.multiArrVals = CODEMIRRORS.m7p7.multiArrVals;
  }

  if (str !== "") {
    CODEMIRRORS.m7p7.setValue(`${str}\n\n${CODEMIRRORS.m7p7.getValue()}`);
  }
});

function m7p7 () {
  for (let i = 1; i <= 6; i++) {
    scm.hasValue(m7p7.env[`v${i}`], `v${i} has no value.`);
    scm.isNumber(`v${i}`, m7p7.env[`v${i}`]);
  }

  for (let i = 1; i <= 3; i++) {
    let pat = scm.parsePattern(`let{rs}v${i}{eq}singleArr{os}\\[{os}\\d+{os}\\]`);
    scm.checkPattern(pat, m7p7.cmObj, `You're not accessing an array index. Correct your syntax for v${i}`);
  }

  for (let i = 4; i <= 6; i++) {
    let pat = scm.parsePattern(`let{rs}v${i}{eq}multiArr{os}\\[{os}\\d+{os}\\]`);
    scm.checkPattern(pat, m7p7.cmObj, `You're not accessing an array index. Correct your syntax for v${i}`);
  }

  count = 1;
  let vals = [myStorage.singleArrVals.split(','), myStorage.multiArrVals.split(',')].flat(2);
  for (let val of vals) {
    scm.test((Number(val) === m7p7.env[`v${count}`]), false, `v${count} is not the correct value. Should be ${val}, not ${m7p7.env[`v${count}`]}`);
    count++;
  }

  scm.setPass(m7p7.cmObj);
}


// Setup
window.addEventListener('load', function () {
  let names = ['Shaun', 'Joe', 'Sarah', 'Mary', 'Simon', 'Lindsay', 'Frank', 'Arsh', 'Gagandeep', 'Rick', 'Cynthia', 'Angelina', 'Amrit', 'Carlos', 'Fred', 'Wilma', 'Betty', 'Barney', 'Sakura', 'Steven', 'Ali', 'Virginia', 'Veronica', 'Betty', 'Archie', 'Reggie', 'Moose', 'Midge', 'Josie', 'Melody'];
  

  let str = "";
  if (!(CODEMIRRORS.m7p8.getValue().match(/let names/))) {
    let randNamesRemove = randomArraySetDestructive(names, 5);
    let randNamesAdd = randomArraySetDestructive(names, 3);
    
    myStorage.randNamesRemove = randNamesRemove;
    myStorage.randNamesAdd = randNamesAdd;

    str += `let names = ${JSON.stringify(randNamesRemove).replace(/\,/g, ', ')};\n\n`;
    str += `// Step 1: Using the correct array method, remove the first element (${randNamesRemove[0]}) from the names array\n`;
    str += `let ${randNamesRemove[0]};\n\n`
    str += `// Step 2: Using the correct array method, remove the last element (${randNamesRemove[4]}) from the array\n`
    str += `let ${randNamesRemove[4]};\n\n`
    str += `// Step 3: Using the correct array method, remove the middle name (${randNamesRemove[2]}) from the array\n`;
    str += `let ${randNamesRemove[2]};\n\n`
    str += `// Step 4: Using the correct array method, add ${randNamesAdd[0]} to the beginning of the array\n`;
    str += `let ${randNamesAdd[0]};\n\n`
    str += `// Step 5: Using the correct array method, add ${randNamesAdd[1]} to the end of the array\n`;
    str += `let ${randNamesAdd[1]};\n\n`
    str += `// Step 6: Using the correct array method, add ${randNamesAdd[2]} between ${randNamesRemove[1]} and ${randNamesRemove[3]} in the array\n`;
    str += `let ${randNamesAdd[2]};\n\n`
  }

  if (str !== "") {
    CODEMIRRORS.m7p8.setValue(`${str}\n\n${CODEMIRRORS.m7p8.getValue()}`);
  }
});

function m7p8 () {
  let randNamesRemove = myStorage.randNamesRemove.split(',');
  let randNamesAdd = myStorage.randNamesAdd.split(',');

  scm.hasValue(m7p8.env[randNamesRemove[0]], `${randNamesRemove[0]} is undefined`);
  let pat = scm.parsePattern(`let{os}${randNamesRemove[0]}{eq}names\\.(shift|splice\\({os}.+{os}\\,{os}1\\))`);
  scm.checkPattern(pat, m7p8.cmObj, `You are using the incorrect method to remove the first element.`);

  scm.hasValue(m7p8.env[randNamesRemove[randNamesRemove.length -1]], `${randNamesRemove[randNamesRemove.length -1]} is undefined`);
  pat = scm.parsePattern(`let{os}${randNamesRemove[randNamesRemove.length -1]}{eq}names\\.(pop|splice\\({os}.+{os}\\,{os}1\\))`);
  scm.checkPattern(pat, m7p8.cmObj, `You are using the incorrect method to remove the last element.`);

  scm.hasValue(m7p8.env[randNamesRemove[1]], `${randNamesRemove[1]} is undefined`);
  pat = scm.parsePattern(`let{os}${randNamesRemove[1]}{eq}names\\.splice\\({os}.+{os}\\,{os}1\\)`);
  scm.checkPattern(pat, m7p8.cmObj, `You are using the incorrect method to remove the middle element.`);

  scm.hasValue(m7p8.env[randNamesAdd[0]], `${randNamesAdd[0]} is undefined`);
  pat = scm.parsePattern(`let{os}${randNamesAdd[0]}{eq}names\\.(unshift|splice\\({os}.+{os}\\,{os}0{os}\\,.+\\))`);
  scm.checkPattern(pat, m7p8.cmObj, `You are using the incorrect method to add the first element.`);

  console.log(randNamesAdd);
  scm.hasValue(m7p8.env[randNamesAdd[1]], `${randNamesAdd[1]} is undefined`);
  pat = scm.parsePattern(`let{os}${randNamesAdd[1]}{eq}names\\.(push|splice\\({os}.+{os}\\,{os}0,{os}.+\\))`);
  scm.checkPattern(pat, m7p8.cmObj, `You are using the incorrect method to add the last element.`);

  scm.setPass(m7p8.cmObj);
}