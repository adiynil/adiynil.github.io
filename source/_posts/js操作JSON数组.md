---
title: 使用JS操作Json数据的笔记
date: 2020/03/25 16:48
tag: [Json,Json数组,JavaScript]
category: [个人笔记]

---

闲来无事（瞎折腾），在GitHub上看到好玩的API就拿来玩一下，因为要用到Json数据，就学了一下用原生的JavaScript操作Json数据。其实也没有怎么接触过Json数据，之前用GitHub的API写了个JS来获取我的repo里面的内容第一次用Json数据，在这里就记录一下。

<!--more-->

### Json对象

```
// JS中新建一个Json对象
var Json = {"name":"value"}

// 添加/修改数据，通过key来访问
Json["gender"]="male"
// 或者
Json.gender="male"

// 删除数据
delete Json.name

```

### Json数组的操作

```
// Json数组的操作
// 新建
var Jsonarray = [{"name":"zhangsan"},{"name":"lisi"}]

// 添加

Jsonarray.push({"name":"wangwu"})

Jsonarray.splice(1,0,{"name":"wangwu"})
// 这里理解为在索引为1的位置插入一个（或多个）Json对象,占有从索引1开始位置
// 也可以用来替换/修改Json数组对象，只要把第二个参数0改成非0，例如1
// 就等同于 把从索引为1开始的1个对象（没有默认为空对象，也就是添加）替换成第三个参数{"name":"wangwu"}
// 也就是说有第三个或者以上参数就是替换或者增加，没有则是删除

// 修改，访问key来直接修改
Jsonarray[0].name="newname"

// 删除
delete Jsonarray[0] // 只是清空，但是其实还占有位置

Jsonarray.shift() // 删除第一项，返回删除的对象
Jsonarray.pop() // 删除最后一项，返回删除的对象
// splice方法，上面有提到，也是返回删除的对象

// 其实通过上面可以看出，Json数组也是一个普通的数组，操作也是和数组的操作一样的，只不过对象变成了Json对象

```

### Json的两个重要函数

这两个函数分别是
- `JSON.parse()`
- `JSON.stringify()`

`JSON.parse(a)`就是把a这个字符串解析成Json格式的对象

`JSON.stringify(b)`就是把b这个Json对象解析成可以被识别的Json字符串

可能这样说不太好理解，这么说吧，如果要通过POST协议传输Json类型的数据，但是是不能直接传输Json对象的，解析成字符串对象就可以。

### 最后

总所周知，Json对象是可以嵌套的，无论是对象或者数组都可以，但是操作方法都一样的，只要通过Json.key来访问到子对象/子数组，操作起来也是一样的。
