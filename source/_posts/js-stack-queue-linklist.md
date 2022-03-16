---
title: JavaScript实现数据结构的栈、队列和双向链表
date: 2020/12/22 12:57
category: [javascript]
tags: [数据结构, 栈, 队列, 链表]
---


数据结构中的栈、队列和链表应该是最基础的了，还有像是图、树、二叉树、最优二叉树/解等等也很重要，前端也要会数据结构是我没想到的，总结一下用JavaScript实现数据结构中的栈、队列和链表中的双向链表。

面试的时候被问到的数据结构题，当时是脑袋有点蒙的，用纸笔不知道怎么下手，过后自己写了一下其实并不难，尤其是栈和队列，可以直接直接用原生Array的pop()、push()、shift()、unshift()方法来实现，之前做JSON数据的时候还专门记录过这几个方法，真的是猪油蒙了心居然没写出来。

<!--more-->

#  栈、队列

首先是栈和队列的实现，栈的核心思想是“先进后出”，队列的核心思想是“先进先出”，上课那会老师就不停得强调他们的区别，队列就像排队，先进先出；而栈是不讲道理的，先进后出。如果你当销售，先生产的产品堆压在仓库而把最新生产的产品拿来卖，到最后你可能会被老板批成PPT。

先是栈的实现，看一下主要要实现的方法：

- pop()：栈顶元素出栈并返回
- push(el)：新元素入栈
- peek()：返回栈顶元素
- size()：返回栈的长度
- isEmpty()：返回栈是否为空
- clear()：清空栈
- print()：打印栈

```javascript
class Stack {
  constructor(...val){
    this.values = [...val]
  }
  pop(){
    return this.values.pop()
  }
  push(val){
    this.values.push(val)
  }
  peek(){
    return this.values[this.values.length-1]
  }
  size(){
    return this.values.length
  }
  isEmpty(){
    return this.values.length == 0
  }
  clear(){
    this.values = []
  }
  print(){
    console.log(this.values.toString())
  }
}
```

然后是队列的实现，和栈的实现非常相似：

- dequeue()：头元素出列
- enqueue(el)：新元素入列
- front()：返回队列头
- size()：返回队列的长度
- isEmpty()：返回是否为空队列
- clear()：清空队列
- print()：打印队列

```javascript
class Queue {
  constructor(...val){
    this.values = [...val]
  }
  dequeue(){
    return this.values.shift()
  }
  enqueue(val){
    this.values.push(val)
  }
  front(){
    return this.values[0]
  }
  size(){
    return this.values.length
  }
  isEmpty(){
    return this.values.length == 0
  }
  clear(){
    this.values = []
  }
  print(){
    console.log(this.values.toString())
  }
}
```

# 双向链表

相比较于栈和队列，双向链表就稍微复杂一点。双向链表是没有顺序的，但是每个结点（Node）都会有指针（Pointer）指向该结点的前结点（Previous）和后结点（Next），还有一个头指针（Head）和尾指针（Tail）分别指向链表的头结点和尾结点，如果没有则指向`Null`，也即是空指针（Null Pointer），理论可能说不太清楚，还是图解比较条理清晰

![image-20201221191959448](https://cdn.jsdelivr.net/gh/adiynil/storage/2022/03/16/image-20201221191959448-7f54d02b.png)

然后是实现，首先我们得有一个结点类Node，包含前指针、后指针和数据：

```javascript
class Node {
  constructor(el) {
    this.element = el
    this.previous = null
    this.next = null
  }
  toString(){
    return this.element
  }
}
```

然后是链表的实现：

- append(el)：添加结点元素
- insert(position, el)：指定位置插入结点元素
- getNode(position)：得到指定位置结点元素
- get(position)：得到指定位置结点数据
- indexOf(el)：返回指定结点的下标
- update(position, el)：更新指定位置的结点
- removeAt(position)：删除指定位置的结点
- isEmpty()：返回链表是否为空
- size()：返回链表的长度
- toString()：重写toString()方法（因为数据结构是自定义的Node）
- backwardString()：反序遍历输出结点数据
- forwardString()：顺序遍历输出结点数据

该有的注释都解释在代码里面了。

```javascript
class DoubleLinkList {
  head = null
  tail = null
  size = 0
  append(el) {
    if (this.size == 0) {
      // 链表长度为零的时候
      this.head = this.tail = el
      this.size++
      return
    }
    // 链表长度不是零的时候：从尾部添加
    el.previous = this.tail
    this.tail.next = el
    this.tail = el
    this.size++
  }
  insert(position, el) {
    let current = null
    // 插入位置在长度之外就默认添加到尾部
    if(position >= this.size)
      return this.append(el)
    // 插入位置在链表头部之前默认插入到头部
    if(position <= 0){
      current = this.head
      current.previous = el
      el.next = current
      this.head = el
      this.size++
      return
    }
    // 在中间插入
    current = this.getNode(position)
    el.previous = current.previous
    el.next = current
    current.previous.next = el
    current.previous = el
    this.size++
  }
  getNode(position) {
    let index = 0
    let current = null
    // 如果链表为空
    if (this.isEmpty())
      return
    // 如果溢出链表
    if(position >= this.size || position < 0)
      return
    // 如果在在链表前半段，从头遍历
    if((this.size / 2) > position){
      current = this.head
      while (index++ < position) {
        current = current.next
      }
    } else {
    // 如果在后半段，从尾遍历
      current = this.tail
      index = this.size - 1
      while (index-- > position) {
        current = current.previous
      }
    }
    return current
  }
  get(position) {
  // 和上一个方法一样，只不过返回的是结点的数据
    let index = 0
    let current = null
    if (this.size == 0)
      return
    if(position >= this.size || position < 0)
      return
    if((this.size / 2) > position){
      current = this.head
      while (index++ < position) {
        current = current.next
      }
    } else {
      current = this.tail
      index = this.size - 1
      while (index-- > position) {
        current = current.previous
      }
    }
    return current.element
  }
  indexOf(el) {
    let current = this.head
    let index = 0
    while(current){
      // 从头遍历，符合结点返回下标否则返回-1
      if(el.element == current.element)
        return index
      current = current.next
      index++
    }
    return -1
  }
  update(position, el) {
    if(position >= this.size || position < 0)
    // 越界判断
      return
    let current = this.getNode(position)
    current.element = el.element
  }
  removeAt(position) {
    // 越界判断
    if(position >= this.size || position < 0)
      return
    // 只有一个结点的时候
    if(this.size == 1){
      this.head = this.tail = null
      this.size--
      return
    }
    // 删除头结点的时候
    if(position == 0){
      this.head = this.head.next
      this.head.previous = null
      this.size--
      return
    }
    // 删除尾结点的时候
    if(position == this.size - 1){
      this.tail = this.tail.previous
      this.tail.next = null
      this.size--
      return
    }
    // 删除中间结点
    let current = this.getNode(position)
    current.previous.next = current.next
    current.next.previous = current.previous
    this.size--
  }
  isEmpty() {
    return this.size == 0
  }
  size(){
    return this.size
  }
  toString() {
    return this.forwardString()
  }
  forwardString() {
    // 从头开始遍历
    let result = []
    let current = this.head
    while(current){
      result.push(current.element)
      current = current.next
    }
    return result.join(',')
  }
  backwardString() {
    // 从尾开始遍历
    let result = []
    let current = this.tail
    while(current){
      result.push(current.element)
      current = current.previous
    }
    return result.join(',')
  }
}
```

