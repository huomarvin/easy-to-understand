class EventEmitter {
  events = {};
  on(type, func) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(func);
  }

  off(type, func) {
    if (!func) {
      this.events[type] = null;
    } else {
      this.events[type] = this.events[type].filter((item) => item !== func);
    }
  }

  emit(type, message) {
    this.events[type].forEach((item) => {
      item(message);
    });
  }

  once(type, func) {
    const fun = (...args) => {
      this.off(type, fun);
      func.apply(this, args);
    };
    this.on(type, fun);
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
