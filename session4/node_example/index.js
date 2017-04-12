console.log("Hello Nodejs");

// 리터럴 객체 받아서 사용
var myvar = require('./myvar');
// console.log(myvar.a);
// console.log(myvar.b);

// function 받아서 사용
// console.log(myvar.a());

var setVar = new myvar();
console.log(setVar.name);
