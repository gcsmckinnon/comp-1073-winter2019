const MODULE = 5;

function m5p1 () {
  let xEle = document.querySelector('[name="m5p1i1"]');
  let yEle = document.querySelector('[name="m5p1i2"]');

  scm.test((Number(xEle.value) === m5p1.env.x), false, `x is NOT equal to ${m5p1.env.x}`);
  myStorage.m5p1i1 = xEle.value;
  
  scm.test((Number(yEle.value) === m5p1.env.y), false, `y is NOT equal to ${m5p1.env.y}`);
  myStorage.m5p1i2 = yEle.value;

  scm.setPass(m5p1.cmObj);
}


function m5p2 () {
  let xEle = document.querySelector('[name="m5p2i1"]');
  let yEle = document.querySelector('[name="m5p2i2"]');

  scm.test((Number(xEle.value) === m5p2.env.x.a), false, `x is NOT equal to ${m5p2.env.x.a}`);
  myStorage.m5p2i1 = xEle.value;
  
  scm.test((Number(yEle.value) === m5p2.env.y.a), false, `y is NOT equal to ${m5p2.env.y.a}`);
  myStorage.m5p2i2 = yEle.value;

  scm.setPass(m5p2.cmObj);
}


function m5p3 () {
  scm.exists('Food', m5p3.env);
  scm.isObject('Food', m5p3.env.Food);

  scm.exists('init', m5p3.env.Food);
  scm.isFunction('init', m5p3.env.Food.init);

  scm.exists('eat', m5p3.env.Food);
  scm.isFunction('eat', m5p3.env.Food.eat);

  let fud = Object.create(m5p3.env.Food);
  fud.init('soilent green');
  console.log(fud.eat());
  scm.setPass(m5p3.cmObj);
}


function m5p4 () {
  scm.exists('obj', m5p4.env);
  scm.exists('objInherit', m5p4.env);

  m5p4.pattern = scm.parsePattern(`objInherit\\.{sym}{eq}`);
  scm.checkPattern(m5p4.pattern, m5p4.cmObj, `You're missing the new objInherit property.`);

  m5p4.pattern = scm.parsePattern(`obj\\.{sym}{eq}`);
  scm.checkPattern(m5p4.pattern, m5p4.cmObj, `You're missing the new obj property.`);

  let sr1 = document.querySelector('[name="m5p4i1"]:checked');
  let sr2 = document.querySelector('[name="m5p4i2"]:checked');

  scm.test((sr1.value === 'true'), false, `Your answer is incorrect: objInherit will have the newly created objInherit property.`);
  scm.test((sr2.value === 'false'), false, `Your answer is incorrect: obj will not have the newly created obj property.`);

  scm.setPass(m5p4.cmObj);
}


function m5p5 () {
  scm.fieldHasValue('[name="m5p6i1"]', m5p5.env.onceAgain.f);
  scm.fieldHasValue('[name="m5p6i2"]', m5p5.env.objInherit.s);
  scm.fieldHasValue('[name="m5p6i3"]', m5p5.env.obj.e);

  scm.setPass(m5p5.cmObj);
}


function m5p6 () {
  scm.isObject('Food', m5p6.env.Food);
  scm.isObject('Vegetable', m5p6.env.Vegetable);

  m5p6.env.Food.testing = true;
  scm.test((m5p6.env.Vegetable.testing), false, `Vegetable is not inheriting from Food.`);

  scm.hasValue(m5p6.env.Vegetable.type, `Your vegetable has not been initialized with a type.`);

  scm.exists('setColour', m5p6.env.Vegetable);
  scm.isFunction('setColour', m5p6.env.Vegetable.setColour);

  m5p6.env.Vegetable.setColour('fuscia');
  scm.isValue(m5p6.env.Vegetable.colour, 'fuscia', `Vegetable.colour doesn't exist. Make sure your .setColour() method is setting the colour property.`);

  scm.isObject('Celery', m5p6.env.Celery);
  scm.test((m5p6.env.Celery.colour), false, `Celery is not inheriting from Vegetable.`);

  scm.hasValue(m5p6.env.Celery.type, `Your celery has not been initialized with a type.`);
  scm.test((m5p6.env.Celery.type !== m5p6.env.Vegetable.type), false, `Your celery has not been initialized with a type.`);

  scm.hasValue(m5p6.env.Celery.colour, `You need to call the .setColour() method on Celery and set its colour.`);
  scm.test((m5p6.env.Celery.colour !== m5p6.env.Vegetable.colour), false, `Celery needs a colour defined.`);

  scm.setPass(m5p6.cmObj);
}


function m5p7 () {
  scm.isFunction('Person', m5p7.env.Person, `Person is not a constructor function.`);

  let dave = new m5p7.env.Person('Dave', 'Bautista');
  scm.isValue(dave.firstName, 'Dave', `The .firstName property cannot be set. You are likely missing your parameter list or there's an error in setting the property.`);
  scm.isValue(dave.lastName, 'Bautista', `The .lastName property cannot be set. You are likely missing your parameter list or there's an error in setting the property.`);

  scm.isFunction('bio', dave.bio);
  let resp = dave.bio();
  scm.isString('Resp', resp, `Your .bio() function is not returning a value. Double check your logic.`);

  for (let prop in m5p7.env) {
    if (prop !== 'Person' && m5p7.env[prop] instanceof m5p7.env.Person) {
      console.log("Bio: ", m5p7.env[prop].bio());
      scm.setPass(m5p7.cmObj);
      return;
    }
  }

  throw{ message: 'You need to instantiate a new person using your Person object.' };
}


function m5p8 () {
  scm.setPass(m5p8.cmObj);
}


function m5p9 () {
  scm.setPass(m5p9.cmObj);
}


function m5p10 () {
  scm.isFunction('Person', m5p10.env.Person);
  scm.isFunction('Superhero', m5p10.env.Superhero);

  let dave = new m5p10.env.Superhero('Dave', 'Bautista', 'Drax the Destroyer', 'Super Strong and Crazy Literal');

  m5p10.pat = scm.parsePattern(`Person\\.call\\({os}this`);
  scm.checkPattern(m5p10.pat, m5p10.cmObj, false, `You have to execute Person.call() passing it this: Person.call(this, firstName, lastName). This needs to be IN the function definition.`);

  m5p10.pat = scm.parsePattern(`Superhero\\.prototype{eq}Object\\.create\\({os}Person\\.prototype{os}\\)`);
  scm.checkPattern(m5p10.pat, m5p10.cmObj, false, `You must assign the Person prototype to the Superhero prototype: Superhero.prototype = Object.create(Person.prototype)`);

  scm.test((dave instanceof m5p10.env.Person), false, `Superhero is not inheriting from Person. You are missing a key element or your syntax has an error.`);

  for (let prop in m5p10.env) {
    if (prop !== 'Superhero' && m5p10.env[prop] instanceof m5p10.env.Superhero) {
      console.log("Bio: ", m5p10.env[prop].origin(`${m5p10.env[prop].firstName} was splattered with horrific toxic waste and transformed into ${m5p10.env[prop].codename}.`));
      scm.setPass(m5p10.cmObj);
      return;
    }
  }

  throw{ message: 'You need to instantiate a new superhero using your Superhero object.' };
}