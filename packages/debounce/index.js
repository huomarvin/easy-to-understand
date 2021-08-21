/**
 * @param {Function} fn
 * @returns
 */
function debounce(fn, delay = 2000) {
  let timer = null;
  return function (...args) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}
