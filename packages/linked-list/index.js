class ListNode {
  next = null;
  constructor(val) {
    this.val = val;
  }
}

class LinkedList {
  // 通过伪头的方式减少空判断
  dummy = new ListNode(-1);
  size = 0;
  // 通过tail指向链表的尾部
  tail = this.dummy;
  constructor() {}
  addTail(val) {
    this.tail.next = new ListNode(val);
    this.tail = this.tail.next;
    this.size += 1;
  }
  addAtHead(val) {
    const node = new ListNode(val);
    node.next = this.dummy.next;
    this.dummy.next = node;
    if (this.tail === this.dummy) {
      this.tail = node;
    }
    this.size += 1;
  }
  getPrevNode(index) {
    let front = this.dummy.next;
    let back = this.dummy;
    // 当index大于链表真实长度时，返回最后一个节点
    // 如果是空链表 prev指向dummy，也就是说prev永远都是有效的
    for (let i = 0; i < index && front !== null; i++) {
      back = front;
      front = front.next;
    }
    return back;
  }
  get(index) {
    if (index < 0 || index >= this.size) {
      return -1;
    }
    return this.getPrevNode(index).next.val;
  }
  addAtIndex(index, val) {
    if (index > this.size) {
      return;
    } else if (index === this.size) {
      this.addTail(val);
    } else if (index <= 0) {
      this.addAtHead(val);
    } else {
      let pre = this.getPrevNode(index);
      let nextNode = pre.next;
      const p = new ListNode(val);
      p.next = nextNode;
      pre.next = p;
      this.size += 1;
    }
  }
  deleteAtIndex(index) {
    if (index < 0 || index >= this.size) {
      return;
    }
    const pre = this.getPrevNode(index);
    if (index === this.size - 1) {
      this.tail = pre;
    }
    pre.next = pre.next.next;
    this.size -= 1;
  }
}

module.exports = {
  LinkedList,
  ListNode,
};
