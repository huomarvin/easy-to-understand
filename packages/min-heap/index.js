class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  peek() {
    return this.heap[0];
  }
  getParentIndex(index) {
    return (index - 1) >> 1;
  }
  getLeft(index) {
    return 2 * index + 1;
  }
  getRight(index) {
    return 2 * index + 2;
  }
  swim(index) {
    if (index === 0) {
      return;
    }
    const pIndex = this.getParentIndex(index);
    while (this.heap[pIndex] > this.heap[index]) {
      const temp = this.heap[index];
      this.heap[index] = this.heap[pIndex];
      this.heap[pIndex] = temp;
      this.swim(pIndex);
    }
  }
  sink(index) {
    let left = this.getLeft(index);
    if (this.heap[left] < this.heap[index]) {
      const tmp = this.heap[index];
      this.heap[index] = this.heap[left];
      this.heap[left] = tmp;
    }
    let right = this.getRight(index);
    if (this.heap[right] < this.heap[index]) {
      const tmp = this.heap[right];
      this.heap[index] = this.heap[right];
      this.heap[right] = tmp;
    }
  }
  pop() {
    if (this.size() === 0) {
      return this.heap.shift();
    }
    const res = this.peek();
    this.heap[0] = this.heap.pop();
    this.sink(0);
    return res;
  }
  insert(value) {
    this.heap.push(value);
    this.swim(this.heap.length - 1);
  }
  toString() {
    return this.heap.join(",");
  }
}

module.exports = MinHeap;
