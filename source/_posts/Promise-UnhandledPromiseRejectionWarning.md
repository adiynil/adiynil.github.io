---
title: Promise的UnhandledPromiseRejectionWarning问题
date: 2021/02/25 21:33
category: []
tags: [promise]
---


在封装Nodejs对MySQL的CRUD API的时候遇到了`UnhandledPromiseRejectionWarning`提示，查询了解到这是Node.js 6.6.0中增加的一个特性：对 Promise 中未处理的 rejection 默认会输出 `UnhandledPromiseRejectionWarning` 提示。

<!--more-->

先看看我原来的code：

```javascript
new Promise((resolve, reject)=>{
	if(2>1) reject('foo')
	resolve('bar')
})
```

也就是说，如果你定义的Promise没有进行Catch处理Rejection这种情况，就会有这个提示，解决方法有几个：

1. 直接用resolve来返回错误代码而不用reject

    反正最后promise都要返回点什么，用reject还是resolve有什么区别呢，我只要在用的时候根据返回的对象去主动判断这个promise是否是成功的也能达到一样的效果。

    ```javascript
    new Promise((resolve, reject)=>{
    	if(2>1) resolve({status: 0, msg: "foo"})
    	resolve({status: 1, msg: "bar"})
    })
    ```

2. 直接在Promise里用空函数处理

    ```javascript
    new Promise((resolve, reject)=>{
        if(2>1) reject("foo")
        resolve("bar")
    }).catch(()=>{})
    ```
    
3. 用node process的全局`unhandledRejection`事件来处理

	```javascript
   process.on('unhandledRejection', error => {
     console.log('我帮你处理了', error.message);
   });
   
   new Promise((resolve, reject)=>{
       if(2>1) reject("foo")
       resolve("bar")
   })
   ```
   
   注意，这种情况下，全局的`unhandledRejection`事件会优先处理这个错误，也就是像第二种在Promise里用Catch处理是不会生效的。

