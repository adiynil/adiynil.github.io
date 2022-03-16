---
title: Express框架中请求内的错误处理
date: 2021/02/25
category: []
tags: [express,promise]
---


> Whichever method you use, if you want Express error handlers to be called in and the application to survive, you must ensure that Express receives the error.

Express官方文档中提到，要确保你的Express程序在遇到错误的时候不会宕机，就得确保Express能接收到程序抛出的错误。

<!--more-->

## uncaughtException导致的node宕机

如上所说，Express程序必须手动处理**所有**可能抛出的错误才不会发生宕机，或者说降低宕机的风险，这和node是息息相关的，毕竟Express是基于Nodejs的，在node中，在遇到`uncaughtException`时会直接结束node进程，之前写过一篇文章

[Promise的UnhandledPromiseRejectionWarning问题](https://fateguy.com/note/20.html)

就是提到的node的这个特性，对Promise对象没有用`.catch()`来捕捉错误就会使node可能宕机。

当然了我们可以用pm2或者forever之类的node进程管理工具来管理重启和记录错误，这样也更利于我们之后对程序进行修复。

但是，在运行过程中，我们还是更希望我们的程序宕机的次数越少越好，如果我们的程序的Session是存储在内存中的，那么程序宕机重启之后，所有的用户登录状态也将不复存在。

## Error Handler 错误处理函数

Express框架内置了一个错误处理函数（Error Handler），这个函数是以中间件（MiddleWare）的形式来使用的，只不过这个中间件和其他的中间件稍微不一样，那就是错误处理函数接受4个参数，比常规中间件多了接收错误的参数`err`。

```javascript
app.use(function(err, req, res, next) {
  // 处理错误
});
```

错误处理函数一般定义在所有路由之后，为了确保Express程序不会因为错误而宕机，则需要把错误抛给这个错误处理函数来处理，在请求内有两种方式把错误抛给错误处理函数。

直接`throw new Error()`

```javascript
app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

或者在`next()`函数中传入错误对象

```javascript
app.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```

直接抛出错误，或者在`next()`函数中传入错误对象都能直接跳过剩余的路由，直接进入错误处理函数。

参考官方文档

> If you pass anything to the `next()` function (except the string `'route'`), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions.

## next()函数

上面的官方文档说道 **except the string `'route'`**

意思即是`next()`直接跳到下一个**中间件**；传的值是字符串`route`即`next('route')`时，直接跳到下一个**路由**；传入其他值都会跳到错误处理函数。

- next()——跳到下一个中间件
- next(‘route’)——跳到下一个路由
- next(err)——跳到错误处理函数

注意`next()`和`next('route')`是分别跳到下一个**中间件**和**路由**，经常看到说`next()`函数会跳到下一个路由的，其实这样说是不准确的，一个路由可以有多个中间件来处理

```js
mw1 = function(req, res, next){}
mw2 = function(req, res, next){}
mw3 = function(req, res, next){}
mw4 = function(req, res, next){}

app.get('/', mw1, mw2, mw3)
app.get('/', mw4)
```

例如在`mw1`函数中调用了`next()`，实际上是跳到`mw2`开始执行，而如果我们调用的是`next('route')`，那么就会直接跳过`mw2`和`mw3`，直接开始执行`mw4`。

之所以有时候混淆是因为经常一个路由我们只用一个函数来处理，而不是链式处理，一个路由一个函数处理，调用`next()`和调用`next('route')`的效果是一样的。

值得一提的还有，在官方文档中还提到

> Starting with Express 5, route handlers and middleware that return a Promise will call `next(value)` automatically when they reject or throw an error.

也就是说，从Express5开始，在请求中或者中间件中的Promise对象，即使没有手动调用`next(err)`和`throw new Error()`，如果Promise中抛出了错误或者`reject`了，那么Express会自动调用`next(err)`，其中的`err`为Promise内抛出的错误或者`reject`的值，如果不存在就传入一个默认的`Error`对象。

