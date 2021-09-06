// Object.assign

// 不会拷贝对象的继承属性
// 不会拷贝对象的不可枚举属性
// 可以拷贝Symbol类型的属性
// let obj1 = { a: { b: 1 }, sym: Symbol(1) };

// Object.defineProperty(obj1, "innumerable", {
//   value: "不可枚举属性",
//   enumerable: false,
// });

// let obj2 = {};
// Object.assign(obj2, obj1);
// obj1.a.b = 2;
// console.log("obj1", obj1);
// console.log("obj2", obj2);

// 扩展运算符
// let cloneObj = {...obj}
/* 对象的拷贝 */

// let obj = { a: 1, b: { c: 1 } };

// let obj2 = { ...obj };
// obj.a = 2;
// console.log(obj); //{a:2,b:{c:1}}
// console.log(obj2); //{a:1,b:{c:1}}
// obj.b.c = 2;
// console.log(obj); //{a:2,b:{c:2}}
// console.log(obj2); //{a:1,b:{c:2}}
// /* 数组的拷贝 */
// let arr = [1, 2, 3];
// let newArr = [...arr]; //跟arr.slice()是一样的效果

// let arr2 = [{ a: 1 }, { b: 2 }];
// let newArr2 = [...arr2];
// newArr2[0].a = 3;
// console.log(arr2, newArr2);

// concat与slice实现数组的浅拷贝
// let arr = [1, 2, 3];
// let newArr = arr.concat();
// newArr[1] = 100;
// console.log(arr);
// console.log(newArr);

// let arr = [1, 2, { val: 4 }];
// let newArr = arr.slice();
// newArr[2].val = 1000;
// console.log(arr); //[ 1, 2, { val: 1000 } ]

// const shallowClone = function (target) {
//   if (typeof target === "object" && target !== null) {
//     const cloneTarget = Array.isArray(target) ? [] : {};
//     // for in 可以获取到对象上继承来的属性，可以获取
//     for (let prop in target) {
//       // 获取自己定义的属性
//       if (target.hasOwnProperty(prop)) {
//         cloneTarget[prop] = target[prop];
//       }
//     }
//     // 浅拷贝可以拷贝Symbol类型的属性
//     for (let key of Object.getOwnPropertySymbols(obj)) {
//       cloneTarget[key] = obj[key];
//     }
//     return cloneTarget;
//   } else {
//     return target;
//   }
// };

// let obj = { a: 1 };
// obj[Symbol("a")] = Symbol(1);
// // const obj2 = Object.assign({}, obj);
// // const obj2 = { ...obj };
// const obj2 = shallowClone(obj);
// console.log(obj, obj2);
// let b = Object.create(obj);
// Object.defineProperty(b, "innumerable", {
//   value: "不可枚举属性",
//   enumerable: false,
// });
// console.log(b, obj);
// for (let prop in obj) {
//   console.log(prop);
// }

// 乞丐版深拷贝
// function Obj() {
//   this.func = function () {
//     alert(1);
//   };
//   this.obj = { a: 1 };
//   this.arr = [1, 2, 3];
//   this.und = undefined;
//   this.reg = /123/;
//   this.date = new Date(0);
//   this.NaN = NaN;
//   this.infinity = Infinity;
//   this.sym = Symbol(1);
// }
// let obj1 = new Obj();
// Object.defineProperty(obj1, "innumerable", {
//   enumerable: false,
//   value: "innumerable",
// });
// console.log("obj1", obj1);
// let str = JSON.stringify(obj1);
// let obj2 = JSON.parse(str);
// console.log("obj2", obj2);

/**
拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
拷贝 Date 引用类型会变成字符串；
无法拷贝不可枚举的属性；
无法拷贝对象的原型链；
拷贝 RegExp 引用类型会变成空对象；
对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。
 */

/**
new Date().constructor === Date
true
new Date().__proto__ === Date.prototype
true
Object.getPrototypeOf(new Date()) === Date.prototype
true 
*/

const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;

const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  if (hash.has(obj)) return hash.get(obj);
  // 获取innumerable properties
  const allDesc = Object.getOwnPropertyDescriptors(obj);
  // 将继承的属性再次继承
  const cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  // 记录cloneObj，后面会cloneObj进行重新赋值
  hash.set(obj, cloneObj);
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};
// 下面是验证代码
let obj = {
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: "我是一个对象", id: 1 },
  arr: [0, 1, 2],
  func: function () {
    console.log("我是一个函数");
  },
  date: new Date(0),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1,
};
Object.defineProperty(obj, "innumerable", {
  enumerable: false,
  value: "不可枚举属性",
});
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj));
obj.loop = obj; // 设置loop成循环引用的属性
let cloneObj = deepClone(obj);
cloneObj.arr.push(4);
console.log("obj", obj);
console.log("cloneObj", cloneObj);
