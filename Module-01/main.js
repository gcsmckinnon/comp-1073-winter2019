// Step 1: Create a variable with the symbol name
// 'greeting' and assign it the value of 'Hello World'
greeting = "Hello World";

// Step 2: Create a variable with the symbol name
// 'fullName' and assign it the value of your name
fullName = "Shaun McKinnon";

// Step 3: Create a variable with the symbol name
// 'age' and assign it the value of your age
age = 39;

// Step 4: Create a variable with the symbol name
// 'hourlyIncome' and assign it a decimal value
hourlyIncome = 83.79;

// Step 5: Create a variable with the symbol name
// 'married' and assign it a boolean value
married = false;

// Step 6: Create a variable with the symbol name
// 'favFood' and assign it the string value of your
// favourite food. Give it only block scoped visibility
// and make it mutable.
let favFood = "5";

// Step 7: Create a variable with the symbol name
// 'favColour' and assign it the string value of your
// favourite colour. Give it only functional scoped
// visibility and make it mutable.
var favColour = "blue";

// Step 8: Create a variable with the symbol name
// 'dob' and assign it the string value of your
// birthdate. Give it only block scoped
// visibility and make it immutable.
const dob = "1978-12-22";

// Step 9: Create a variable with the symbol name
// 'favNum' and assign it the string value of your
// favourite number. Give it only global visibility
// and make it mutable.
favNum = 256;

// Step 10: Compare 5 and "5" so it is true using loose comparison
let q = 5 == "5";

// Step 11: Compare 7 and 3 so it is true using greater than
let w = 7 > 3 ;

// Step 12: Compare "Shaun" and "Bob" so it is true using loose comparison
let e = "Shaun" != "Bob";

// Step 13: Compare 5 and "5" so it is false using strict comparison
let r = 5 === "5";

// Step 14: Compare both expressions so it's true
// using the correct logical operator
let expa1 = 5 < 6;
let expa2 = 7 > 3;
let t = expa1 && expa2;

// Step 15: Compare both expressions so it's true
// using the correct logical operator
let expb1 = 5 < 2;
let expb2 = 7 > 2;
let y = expb1 || expb2;

// Step 16: Write a condition that accomplishes
// the following logic:
let ourTestNum = 10;
// a) If ourTestNum is greater than 10, set it to 10.
// b) Otherwise, if ourTestNum is less than 10, set it
//    to 20.
// c) Otherwise, set ourTestNum to 15
if (ourTestNum > 10) {
  ourTestNum = 10;
} else if (ourTestNum < 10) {
  ourTestNum = 20;
} else {
  ourTestNum = 15;
}

// Step 17: Write a condition that accomplishes
// the following logic:
let res = 10;
// a) If res is equal to 10 then set res to 15.
// b) If res is equal to 15 then set res to 20.
// c) Otherwise res should be set to 30.
switch (res) {
  case 10:
    res = 15;
    break;
  case 15:
    res = 20;
    break;
  default:
    res = 30;
    break;
}

// Step 18: Write a ternary that turns the light switch
// off if it's on and on if it's off
let lightSwitch = 'on';
lightSwitch = (lightSwitch === 'on') ? 'off' : 'on';