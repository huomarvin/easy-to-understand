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
  let res = false;
  while (obj) {
    if (obj.__proto__ === Clz.prototype) {
      return true;
    }
    obj = obj.__proto__;
  }
  return res;
}

console.log(_instanceof(parrot, Parrot));
console.log(_instanceof(parrot, Animal));
console.log(_instanceof(parrot, Person));
