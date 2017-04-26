"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Car = function () {
  function Car(name) {
    _classCallCheck(this, Car);

    this.name = name;
    this.color = "red";
  }

  _createClass(Car, [{
    key: "printColor",
    value: function printColor() {
      console.log(this.name + " is " + this.color);
    }
  }]);

  return Car;
}();

var mycar = new Car("car");
mycar.printColor();
