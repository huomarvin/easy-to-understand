var arr = [1, [2, [3, 4, 5]]];
// console.log(flatten(arr)); // [1, 2, 3, 4，5]

// 解法一 递归
// function flatten(arr) {
//   let res = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       res = res.concat(flatten(arr[i]));
//     } else {
//       res = res.concat(arr[i]);
//     }
//   }
//   return res;
// }

// 解法二 reduce
// function flatten(arr) {
//   return arr.reduce((acc, cur) => {
//     return Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur];
//   }, []);
// }

// 解法三 拓展运算符
// function flatten(arr) {
//   while (arr.some((item) => Array.isArray(item))) {
//     arr = [].concat(...arr);
//   }
//   return arr;
// }

// 解法四 toString与split
// function flatten(arr) {
//   return arr.toString().split(",").map(Number);
// }

// 解法五 es6 新增api
// function flatten(arr) {
//   return arr.flat(Infinity);
// }

// 解法六 正则+JSON.stringify
function flatten(arr) {
  return JSON.parse("[" + JSON.stringify(arr).replace(/[\[|\]]/g, "") + "]");
}

console.log(flatten(arr));
