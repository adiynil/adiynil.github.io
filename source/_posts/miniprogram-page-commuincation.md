---
Title: 微信小程序页面传值
Date: 2022/03/16 14:45
Category: [个人笔记]
Tag: [微信小程序, 小程序, 页面传参]
---



- setStorage/getStorage（setStorageSync/getStorageSync）存储到缓存，在页面的onShow阶段绑定
- wx.navigateTo({url: '../page/you/go?key=value'})在onLoad中获取option参数（tabBar页面不支持）
- 模板传参/组件传参

<!--more-->

```wxml
// 模板
<template name="comment">
	<view>{{msg}} - {{time}}<view>
</template>
// 使用模板
<import src="link/to/your/template.wxml"/>
<template is="comment" data="{{...item}}" />
// wxss样式
@import "link/to/template/style.wxss"
// 页面数据
Page({
	data: {
		item: {
			msg: "hello",
			time: "2022-02-22"
		}
	}
})

```

- 获取到当前的页面对上一页面进行setData

```js
let pages = getCurrentPages()
prevPage = pages[pages.length - 2]
prevPage.setData({/*  */})
```



