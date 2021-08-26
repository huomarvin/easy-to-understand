"use strict";
const MinHeap = require("..");

describe("最小堆测试", () => {
  it("插入堆中的数据会自动进行上浮操作", () => {
    const heap = new MinHeap();
    heap.insert(3);
    heap.insert(2);
    heap.insert(1);
    expect(heap.peek()).toBe(1);
  });

  it("弹出堆中的数据会自动进行下沉操作", () => {
    const heap = new MinHeap();
    heap.insert(4);
    heap.insert(3);
    heap.insert(2);
    heap.insert(1);
    heap.pop();
    expect(heap.peek()).toBe(2);
  });
});
