class Animal {}
class Bird extends Animal {}
class Parrot extends Bird {}
class Person {}

const parrot = new Parrot();

console.log(parrot instanceof Parrot);
console.log(parrot instanceof Animal);
console.log(parrot instanceof Person);

// instanceOf相当于在对象的原型链上去找看看有没有对应的原型对象即可

function _instanceof(obj, Clz) {
  if (typeof obj !== "object" || obj === null) return false;
  let proto = Object.getPrototypeOf(obj);
  while (true) {
    if (proto === null) return false;
    if (proto === Clz.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

console.log(_instanceof(parrot, Parrot));
console.log(_instanceof(parrot, Animal));
console.log(_instanceof(parrot, Person));
