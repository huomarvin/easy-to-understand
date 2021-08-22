/**
 * @param {Function} func
 * @param {number} period
 * @returns Function
 */
function throttle(func, period = 500) {
  let lastTime = new Date();
  let timer = null;
  return function (...args) {
    const now = new Date();
    if (!timer && now - lastTime > period) {
      timer = setTimeout(() => {
        func.call(this, ...args);
        lastTime = new Date();
        timer = null;
      }, period);
    }
  };
}
