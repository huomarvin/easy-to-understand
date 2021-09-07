// 异常
// 当在循环引用时会抛出异常TypeError ("cyclic object value")（循环对象值）
// 当尝试去转换 BigInt 类型的值会抛出TypeError ("BigInt value can't be serialized in JSON")（BigInt值不能JSON序列化）.
// 描述
// JSON.stringify()将值转换为相应的JSON格式：

// 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
// 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
// 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
// undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）
// 或者被转换成 null（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，
// 如JSON.stringify(function(){}) or JSON.stringify(undefined).
// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
// 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
// Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
// NaN 和 Infinity 格式的数值及 null 都会被当做 null。
// 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

const isObject = (obj) => typeof obj === "object" && obj !== null;

function jsonStringify(obj, map = new WeakMap()) {
  // 先判断循环引用
  if (isObject(obj) && map.has(obj)) throw TypeError("cyclic object value");
  isObject(obj) && map.set(obj, true);
  // 判断BigInt
  if (Object.prototype.toString.call(obj) === "[object BigInt]") {
    throw TypeError("Do not know how to serialize a BigInt");
  }
  if (obj === Infinity || Number.isNaN(obj) || obj === null) {
    return "null";
  }
  if (typeof obj === "string") {
    return `"${obj}"`;
  }
  if (
    obj === undefined ||
    typeof obj === "function" ||
    typeof obj === "symbol"
  ) {
    return undefined;
  }
  if (isObject(obj)) {
    if (obj.toJSON && typeof obj.toJSON === "function") {
      return jsonStringify(obj.toJSON());
    } else if (Array.isArray(obj)) {
      let result = [];
      obj.forEach((item, index) => {
        result[index] = jsonStringify(item);
      });
      return `[${result}]`;
    } else {
      let result = [];
      Object.keys(data).forEach((item, index) => {
        result.push(`"${item}":${jsonStringify(data[item])}`);
      });
      return ("{" + result + "}").replace(/'/g, '"');
    }
  }
  return obj;
}

// console.log(JSON.stringify(BigInt(11111)));
// console.log(Object.prototype.toString.call(BigInt(11111)));
// console.log(JSON.stringify(new Date(0)));
// console.log(JSON.stringify(""));
// console.log(JSON.stringify(1));
// console.log(JSON.stringify(false));
// console.log(JSON.stringify(null));
// console.log(JSON.stringify(NaN));
// console.log(JSON.stringify(Infinity));
// console.log(JSON.stringify(undefined));
// console.log(JSON.stringify(function () {}));
// console.log(JSON.stringify(Symbol()));
// console.log(JSON.stringify([1, 2, 3]));
// console.log(
//   JSON.stringify({
//     b: 1,
//     toJSON() {
//       return "a";
//     },
//   })
// );
// console.log(jsonStringify(BigInt(11111)));
const a = { b: 1 };
a.c = a;
// console.log(JSON.stringify(a));
console.log(jsonStringify(a));
// console.log(jsonStringify(new Date(0)));
// console.log(jsonStringify(""));
// console.log(jsonStringify(1));
// console.log(jsonStringify(false));
// console.log(jsonStringify(null));
// console.log(jsonStringify(NaN));
// console.log(jsonStringify(Infinity));
// console.log(jsonStringify(undefined));
// console.log(jsonStringify(function () {}));
// console.log(jsonStringify(Symbol()));
// console.log(jsonStringify([1, 2, 3]));
// console.log(
//   jsonStringify({
//     b: 1,
//     toJSON() {
//       return "a";
//     },
//   })
// );
