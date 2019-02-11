const MODULE = 6;

function m6p1 () {
  console.log("WE CONTROL THE HORIZONTAL AND THE VERTICAL!!!");
}


// m6p2 preloader
let m6p2sr = scramble('#m6p2sr > li');
function m6p2 () {
  let items = document.querySelectorAll('#m6p2sr > li');

  items = Array.from(items);

  let order = items.map(item => item.id);

  scm.test((order.toString() === m6p2sr.origOrder.toString()), false, `This order is incorrect`);

  scm.setPass(m6p2.cmObj);
}


function m6p3 () {
  scm.setPass(m6p3.cmObj);
}


function m6p4 () {
  const tag = document.querySelector('[name="m6p4i1"]');
  const name = document.querySelector('[name="m6p4i2"]');

  scm.test((tag.value.toLowerCase().trim() === 'input'), false, `Your value, ${tag.value}, is incorrect.`);
  scm.test((name.value.trim() === 'thisIsButton'), false, `Your value, ${name.value}, is incorrect.`);

  scm.setPass(m6p4.cmObj);
}


function m6p5 () {
  scm.hasValue(m6p5.env.items, `Your selector isn't working. You haven't selected any elements.`);
  scm.test((m6p5.env.items.length === 3), false, `Your selector isn't correct. You should have selected 3 elements.`);

  let itemText = Array.from(m6p5.env.items).map(item => item.textContent);
  let unique = Array.from(new Set(itemText));
  scm.test((unique.length === 1 && unique[0].toLowerCase().trim() === 'even'), false, `You didn't select the correct element. Try again.`);

  scm.setPass(m6p5.cmObj);
}


function m6p6 () {
  for (let key in m6p6.env) {
    scm.hasValue(m6p6.env[key], `Your variable ${key} is undefined.`);
  }

  scm.test((m6p6.env.ul instanceof HTMLUListElement), false, `Your ul variable contains the wrong value. Isn't an instance of HTMLULListElement. Is an instanceof ${m6p6.env.ul.constructor.name}.`);
  scm.test((m6p6.env.ul.id === 'm6p6sr'), false, `You selected the wrong ul. Be more specific in your selector.`);

  scm.test((m6p6.env.labels instanceof NodeList), false, `Your labels variable contains the wrong value. Isn't an instance of NodeList. Is an instanceof ${m6p6.env.labels.constructor.name}.`);

  for (let ele of m6p6.env.labels) {
    scm.test((ele.classList.contains('label')), false, `Your labels variable contains the wrong list of HTMLElements. Be more specific with your selector.`);
  }

  m6p6.pat = scm.parsePattern(`ul\\.querySelectorAll`);
  scm.checkPattern(m6p6.pat, m6p6.cmObj, `You must scope the querySelectorAll method to the ul.`);

  scm.test((m6p6.env.firstClasses instanceof NodeList), false, `Your firstClasses variable contains the wrong value. Isn't an instance of NodeList. Is an instanceof ${m6p6.env.firstClasses.constructor.name}.`);

  for (let ele of m6p6.env.firstClasses) {
    scm.test((ele.classList.contains('first')), false, `Your firstClasses variable contains the wrong list of HTMLElements. Be more specific with your selector.`);
  }

  scm.setPass(m6p6.cmObj);
}


function m6p7 () {
  m6p7.pat = scm.parsePattern(`falconP\\.textContent{eq}{value}`);
  scm.checkPattern(m6p7.pat, m6p7.cmObj, `You're not assigning the value to falconP correctly. Try:\nfalconP.textContent = {value};\nChange {value} to be whatever value you want.`);
  m6p7.pat = scm.parsePattern(`falconInput\\.value{eq}{value}`);
  scm.checkPattern(m6p7.pat, m6p7.cmObj, `You're not assigning the value to falconInput correctly. Try:\nfalconInput.value = {value};\nChange {value} to be whatever value you want.`);

  scm.setPass(m6p7.cmObj);
}


function m6p8 () {
  scm.hasValue(m6p8.env.styleMe, `styleMe has no value and is undefined. FIX IT!!!`);

  scm.test((m6p8.env.styleMe instanceof HTMLDivElement), false, `Your styleMe is not an instance of HTMLDivElement. It is an instance of ${m6p8.env.styleMe.constructor.name}.`);

  scm.test((m6p8.env.styleMe.style.background !== "" || m6p8.env.styleMe.style.backgroundColor !== ""), false, `You didn't set the background color of styleMe.`);
  scm.test((m6p8.env.styleMe.style.font !== "" || m6p8.env.styleMe.style.fontColor !== ""), false, `You didn't set the font color of styleMe.`);
  scm.test((m6p8.env.styleMe.style.borderRadius !== ""), false, `You didn't set the font color of styleMe.`);

  scm.setPass(m6p8.cmObj);
}


function m6p9 () {
  const first = m6p9.env.first;
  const second = m6p9.env.second;

  scm.test((first.parentNode.id === 'start'), false, `You haven't moved the first element back to start.`);
  scm.test((second.parentNode.id === 'start'), false, `You haven't moved the second element back to start.`);

  const idOrder = Array.from(m6p9.env.start.childNodes).map(e => e.id);
  scm.test((idOrder[0] === '_2'), false, `You didn't put the second above the first.`);

  scm.setPass(m6p9.cmObj);
}




function m6p10 () {
  scm.hasValue(m6p10.env.ps, `ps is undefined`);

  scm.test((m6p10.env.ps instanceof NodeList), false, `ps is not an instance of NodeList, it is an instance of ${m6p10.env.ps.constructor.name}.`);

  scm.setPass(m6p10.cmObj);
}


function m6p11 () {
  m6p11.pat = scm.parsePattern(`Array\\.from\\({os}lis{os}\\)\\.filter`);
  scm.checkPattern(m6p11.pat, m6p11.cmObj, `Your syntax for Array.from is incorrect.`);

  scm.hasValue(NodeList.prototype.filter, `You're missing the .filter() polyfill on NodeList`);

  const lis = document.querySelectorAll('span.first');
  const nodes = document.querySelectorAll('span');

  const filtered = nodes.filter(node => node.classList.contains('first'));

  scm.hasValue(filtered, `Your NodeList.prototype.filter() method is not returning a value.`);
  scm.test((filtered instanceof NodeList), false, `Your NodeList.prototype.filter() method is not returning a NodeList. It is returning a ${filtered.constructor.name}.`);
  scm.test((lis.length === filtered.length), false, `Your NodeList.prototype.filter() method isn't working correctly. It failed to filter the nodes.`);

  scm.setPass(m6p11.cmObj);
}

// NodeList.prototype.filter = function (callback) {
//   let nodelist = document.createDocumentFragment();
  
//   for (let node of this) {
//     if (!callback(node)) {
//       continue;
//     } else {
//       nodelist.append(node);
//     }
//   }
  
//   return nodelist;
// }