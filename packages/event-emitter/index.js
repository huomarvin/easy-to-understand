class EventEmitter {
  map = new Map();
  addListener(type, func, once = false) {
    const listeners = this.map.get(type) || [];
    listeners.push({
      func,
      once,
      valid: true,
    });
    this.map.set(type, listeners);
  }
  on(type, func) {
    this.addListener(type, func);
  }

  off(type, func) {
    if (!this.map.has(type)) return;
    let listeners = this.map.get(type);
    listeners = listeners.filter((x) => x.func !== func);
    this.map.set(type, listeners);
  }

  emit(type, message) {
    if (!this.map.has(type)) return;
    let listeners = this.map.get(type);
    listeners = listeners.map((listener) => {
      if (listener.valid) {
        listener.func(message);
        if (listener.once) {
          listener.valid = false;
        }
      }
      return listener;
    });
    this.map.set(type, listeners);
  }

  once(type, func) {
    this.addListener(type, func, true);
  }
}

const emitter = new EventEmitter();

function hello(name) {
  console.log("hello", name);
}
function hello2(name) {
  console.log("hello2", name);
}
emitter.on("say", hello);
emitter.emit("say", "John");
emitter.on("say", hello2);
emitter.emit("say", "Lily");
emitter.off("say", hello2);
emitter.emit("say", "Lucy");
//会输出 hello John、hello Lily、hello Lucy，之后还要加也可以继续触发
emitter.once("see", hello);
emitter.emit("see", "Tom");
emitter.emit("see", "Tom");
//只会输出一次 hello Tom
