"use strict";
const { LinkedList } = require("..");

describe("测试链表", () => {
  it("test addTail", () => {
    const ll = new LinkedList();
    ll.addTail(2);
    ll.addTail(3);
    expect(ll.size).toBe(2);
    expect(ll.get(0)).toBe(2);
    expect(ll.get(1)).toBe(3);
  });
  it("test addAtHead", () => {
    const ll = new LinkedList();
    ll.addAtHead(2);
    ll.addAtHead(3);
    expect(ll.size).toBe(2);
    expect(ll.get(0)).toBe(3);
    expect(ll.get(1)).toBe(2);
  });
  it("test getPrevNode", () => {
    const ll = new LinkedList();
    ll.addTail(2);
    ll.addTail(3);
    expect(ll.size).toBe(2);
    expect(ll.getPrevNode(0)).toBe(ll.dummy);
    expect(ll.getPrevNode(1)).toBe(ll.dummy.next);
  });
  it("test addAtIndex", () => {
    const ll = new LinkedList();
    ll.addTail(2);
    ll.addTail(3);
    expect(ll.size).toBe(2);
    ll.addAtIndex(10, 1);
    expect(ll.size).toBe(2);
    ll.addAtIndex(-1, 1);
    expect(ll.size).toBe(3);
    ll.addAtIndex(0, 1);
    expect(ll.size).toBe(4);
    ll.addAtIndex(4, 5);
    expect(ll.size).toBe(5);
  });
  it("test deleteAtIndex", () => {
    const ll = new LinkedList();
    ll.addTail(2);
    ll.addTail(3);
    expect(ll.size).toBe(2);
    ll.deleteAtIndex(4);
    expect(ll.size).toBe(2);
    ll.deleteAtIndex(1);
    ll.deleteAtIndex(0);
    expect(ll.size).toBe(0);
  });
});
