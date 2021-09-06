const _new = function (clz, ...args) {
  if (typeof clz !== "function") {
    throw new Error("clz must be a function");
  }
  let obj = new Object();
  obj.__proto__ = Object.create(clz.prototype);
  //   obj.__proto__ = clz.prototype;
  const res = clz.apply(obj, args);
  const isObject = typeof res === "object" && res !== null;
  const isFunction = typeof res === "function";
  return isObject || isFunction ? res : obj;
};

function Person(name) {
  this.name = name;
}

const person = _new(Person, "person");
const person1 = new Person("person");
console.log(person instanceof Person);
console.log(person1 instanceof Person);

function Person2(name) {
  this.name = name;
  return {
    name: "person",
  };
}

const person2 = _new(Person2, "person2");
const person22 = new Person2("person2");
console.log(person2.name);
console.log(person22.name);

function Person3(name) {
  this.name = name;
  function r() {}
  return r;
}

const person3 = _new(Person3, "person3");
const person33 = new Person3("person3");
console.log(person3.name);
console.log(person33.name);

Function.prototype.call2 = function (context, ...args) {
  context = context || {};
  context.fn = this;
  const result = eval("context.fn(...args)");
  delete context.fn;
  return result;
};

console.log(Math.max.call2(null, ...[1, 2, 3]));
console.log(Math.max.call(null, ...[1, 2, 3]));

Function.prototype.apply2 = function (context, args) {
  context = context || {};
  context.fn = this;
  const res = eval("context.fn(...args)");
  delete context.fn;
  return res;
};

console.log(Math.max.apply(null, [1, 2, 3]));
console.log(Math.max.apply2(null, [1, 2, 3]));

Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("this must be a function");
  }
  const self = this;
  const fBound = function () {
    self.apply(context, args);
  };
  return fBound;
};

const apple = {
  name: "apple",
  eat(number) {
    console.log(`${this.name} 吃了 ${number} 口`);
  },
};

apple.eat.bind({ name: "banana" }, "2")();
apple.eat.bind2({ name: "banana" }, "2")();
