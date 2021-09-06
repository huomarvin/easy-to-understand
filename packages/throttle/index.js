/**
 * @param {Function} func
 * @param {number} period
 * @returns Function
 */
function throttle(func, period = 500) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      func.call(this, ...args);
      timer = null;
    }, period);
  };
}
