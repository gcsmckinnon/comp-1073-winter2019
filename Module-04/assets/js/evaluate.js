const MODULE = 4; // Sets the module number

function m4p1 () {
  scm.setPass(m4p1.cmObj);
}


function m4p2 () {
  m4p2.pat = scm.parsePattern(`^{os}debugger`);
  scm.checkPattern(m4p2.pat, m4p2.cmObj, `You're missing the debugger or your syntax is incorrect.`);

  m4p2.pat = scm.parsePattern(`{bs}valueOfSum{eq}{numR}{semiO}`);
  scm.checkPattern(m4p2.pat, m4p2.cmObj, `The expected syntax is: let valueOfSum = ${m4p2.env.sum};`);
  scm.isValue(m4p2.env.valueOfSum, m4p2.env.sum);

  scm.setPass(m4p2.cmObj);
}


function m4p3() {
  let stringProperties = Object.getOwnPropertyNames(String);
  let numberProperties = Object.getOwnPropertyNames(Number);
  let booleanProperties = Object.getOwnPropertyNames(Boolean);
  let arrayProperties = Object.getOwnPropertyNames(Array);
  let functionProperties = Object.getOwnPropertyNames(Function);
  let objectProperties = Object.getOwnPropertyNames(Object);
  
  console.log({
    String: stringProperties,
    Number: numberProperties,
    Boolean: booleanProperties,
    Array: arrayProperties,
    Function: functionProperties,
    Object: objectProperties
  });

  m4p3.pat = scm.parsePattern(`{bs}mathObjectProperties{eq}`);
  scm.checkPattern(m4p3.pat, m4p3.cmObj, `Your syntax is incorrect. The syntax should look like this: let mathObjectProperties = Object.getOwnPropertyNames(Math);`);
  
  m4p3.pat = scm.parsePattern(`Object\\.getOwnPropertyNames\\({os}Math{os}\\){semiO}`);
  scm.checkPattern(m4p3.pat, m4p3.cmObj, `Your syntax is incorrect. The syntax should look like this: let mathObjectProperties = Object.getOwnPropertyNames(Math);`);

  scm.setPass(m4p3.cmObj);
}


function m4p4 () {
  scm.setPass(m4p4.cmObj);
}

function m4p5 () {
  scm.setPass(m4p5.cmObj);
}

function m4p6 () {
  scm.isObject('person', m4p6.env.person);
  scm.isString('person.name', m4p6.env.person['name']);
  scm.isNumber('person.age', m4p6.env.person['age']);
  scm.isString('person.dob', m4p6.env.person['dob']);

  scm.copy2Practice('textarea#m4p7', CODEMIRRORS.m4p7, `let person = {
  name: "${m4p6.env.person.name}",
  age: ${m4p6.env.person.age},
  dob: "${m4p6.env.person.dob}"
};`);

  scm.setPass(m4p6.cmObj);
}

function m4p7 () {
  scm.isFunction('bio', m4p7.env.person.bio);
  scm.isString('person.bio returned value', m4p7.env.person.bio());
  scm.inConsole(m4p7.env.person.bio());

  scm.copy2Practice('textarea#m4p8', CODEMIRRORS.m4p8, `let person = m4p7.env.person;`);

  scm.setPass(m4p7.cmObj);
}


function m4p8 () {
  scm.isObject('person', m4p8.env.person);
  let keys = Object.keys(m4p8.env.person).filter((key) => {
    return !['name', 'age', 'dob', 'bio'].includes(key);
  });
  
  scm.test((keys.length !== 0), false, `You have either defined the properties incorrectly, or not added them yet.`);

  let vari, func;
  for (let key of keys) {
    if (typeof m4p8.env.person[key] !== "function") {
      vari = key;
    } else {
      func = key;
    }
  }

  scm.isNumber(vari, m4p8.env.person[vari]);
  scm.isFunction(func, m4p8.env.person[func]);

  scm.test((m4p8.env.person[func]() > m4p8.env.person[vari] * 0.3 && m4p8.env.person[func]() < m4p8.env.person[vari] * 0.4), false, `Your equation is incorrect or your function isn't working. Try this return statement in your function: return this.${vari} * 0.393701; Your value was: ${m4p8.env.person[vari] * 0.393701}`);

  scm.setPass(m4p8.cmObj);
}


function m4p9 () {
  scm.isFunction('Person', m4p9.env.Person);
  let person = new m4p9.env.Person("Shaun McKinnon", 40, "1978-12-22");
  scm.isString('Person.name', person.name);
  scm.isNumber('Person.age', person.age);
  scm.isString('Person.dob', person.dob);

  scm.checkPattern(scm.parsePattern(
    `{bs}{sym}{eq}new{rs}Person{plag}`
  ), m4p9.cmObj, `You have a syntax error. Check your instantiations.`);

  let resp = scm.checkPattern(scm.parsePattern('{varCapt}'), m4p9.cmObj);

  let vars = resp.map((e) => {
    let key = e.matches[1].trim();
    if (typeof m4p9.env[key] === "object" && key !== 'Person')
      return key;
  }).filter(e => e);

  for (let v of vars) {
    scm.isObject(v, m4p9.env[v]);
    scm.isString(`${v}.name`, m4p9.env[v].name);
    scm.isNumber(`${v}.age`, m4p9.env[v].age);
    scm.isString(`${v}.dob`, m4p9.env[v].dob);
  }

  scm.setPass(m4p9.cmObj);
}