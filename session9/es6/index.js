class Car {
  constructor(name) {
    this.name = name;
    this.color = "red";
  }
  
  printColor() {
    console.log(`${this.name} is ${this.color}`);
  }
}

let mycar = new Car("car");
mycar.printColor();