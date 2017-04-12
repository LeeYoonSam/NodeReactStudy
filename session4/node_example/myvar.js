// #commonjs 방식(module exports)

// var a = "my variable";

// module.exports.a = a;


// 한번에 리터럴 객체 보내기
// module.exports = {
//     a : "myvar a print",
//     b : "myvar b print",
// };

// function 보내기
// module.exports.a = function() {
//     return "Return function";
// };

function Mycar() {
    this.name = "my Instance";
}

module.exports = Mycar;