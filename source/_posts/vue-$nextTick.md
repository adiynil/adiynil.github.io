---
title: vue中$nextTick的使用
date: 2021/03/23
tags: [vue,$nextTick]
category: []
---

### 一、使用方法

在vue中有一种情况，获取了数据后，需要对新视图进行下一步操作或者其他操作时，发现获取不到dom。因为赋值操作只完成了数据模型的改变并没有完成视图更新。在这个时候我们需要$nextTick函数（或者setTimeout）。<!--more-->
 比如：



```php
new Vue({
  el: '#app',
  data: {
    list: []
  },
  mounted: function () {
    this.get()
  },
  methods: {
    get: function () {
      this.$http.get('/api/article').then(function (res) {
        this.list = res.data.data.list
        // ref  list 引用了ul元素，我想把第一个li颜色变为红色
        this.$refs.list.getElementsByTagName('li')[0].style.color = 'red'
      })
    }
  }
})
```

使用示例



```kotlin
this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML
})
```

### 二、使用场景

1、在生命周期created()中进行的dom操作一定要放到nextTick()的回调函数中。
 2、在数据变化后要执行某个操作，而这个操作需要使用随数据变化而变化的dom结构时，这个操作都应该放进nextTick()的回调函数中。

### 三、原因

Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作上非常重要。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部尝试对异步队列使用原生的 Promise.then 和MessageChannel，如果执行环境不支持，会采用 setTimeout(fn, 0)代替。



作者：板栗栗
链接：https://www.jianshu.com/p/aa21e186649d
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。