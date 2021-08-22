function throttle(func, period = 2000) {
  let lastTime = new Date();
  return function (...args) {
    const now = new Date();
    if (now - lastTime > period) {
      func.call(this, ...args);
      lastTime = new Date();
      return;
    }
  };
}
