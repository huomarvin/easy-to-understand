/**
 * 简单分析一下，不论怎么去调用，都会自动去执行，但是其中涉及到了sleep和sleepFirst，会影响到执行顺序
 * 可以添加一个事件队列，然后将待执行代码放入到事件队列里面，使用setTimeout(() => {}, 0) 来做自执行
 */

class LazyMan {
  constructor(name) {
    this.name = name;
    this.taskQueue = [];
    this.init();
  }
  doTask() {
    this.taskQueue.length > 0 && this.taskQueue.shift()();
  }
  init() {
    this.taskQueue.push(() => {
      console.log(`My name is ${this.name}`);
      this.doTask();
    });
    setTimeout(() => {
      this.doTask();
    }, 0);
  }
  eat(food) {
    this.taskQueue.push(() => {
      console.log(`${this.name} is eating ${food}`);
      this.doTask();
    });
    return this;
  }
  sleep(time) {
    this.taskQueue.push(() => {
      setTimeout(() => {
        console.log(`sleep ${time} ms`);
        this.doTask();
      }, time);
    });
    return this;
  }
  sleepFirst(time) {
    this.taskQueue.unshift(() => {
      setTimeout(() => {
        console.log(`first sleep ${time}ms`);
        this.doTask();
      }, time);
    });
    return this;
  }
}

const man = new LazyMan("Mick");

man.eat("Rice").sleep(1000).eat("Apple").sleepFirst(1000);

// eat rice  sleep   eat apple

// 执行顺序
// 打印 first sleep 1000ms (间隔1000ms)
// 打印 My Name is Mick
// 打印 Mick is eating Rice
// 打印 sleep 1000ms (间隔1000ms)
// 打印 Mick is eating Apple
