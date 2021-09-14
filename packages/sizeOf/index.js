"use strict";

function calculator(object) {
  let objectType = typeof object;
  switch (objectType) {
    case "string":
      return object.length * 2;
    case "boolean":
      return 4;
    case "number":
      return 8;
    case "object":
      if (Array.isArray(object) && object !== null) {
        return object.map(calculator).reduce((acc, cur) => acc + cur, 0);
      } else {
        return sizeOfObject(object);
      }
    default:
      return 0;
  }
}
const weakSet = new WeakSet();

function sizeOfObject(object) {
  if (object === null) return 0;
  let bytes = 0;
  for (let key in object) {
    let value = object[key];
    if (typeof value === "object" && value !== null) {
      if (weakSet.has(value)) {
        continue;
      }
      weakSet.add(value);
    }
    bytes += calculator(value);
    bytes += calculator(key);
  }
  return bytes;
}

const testData = {
  a: 111,
  b: "cccc",
  2222: false,
};

console.log(calculator(testData));
