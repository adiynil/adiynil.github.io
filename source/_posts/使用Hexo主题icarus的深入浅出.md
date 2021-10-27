---
title: 使用Hexo主题icarus的深入浅出
date: 2020/02/05 13:55
tags: [icarus,Hexo]
category: 干货
---

你现在所看到的站点是我使用Hexo在GitHub Page搭建的，用的主题是icarus，icarus这个主题非常好看而且配置很多很齐全，但是总有一些地方是不够用的，这里整理一下我自己对这个主题的修修改改。

<!--more-->

# 前言
----

icarus 的官方文档 [点击这里](https://easyhexo.com/2-Theme-use-and-config/2-12-hexo-theme-icarus/)

icarus GitHub开源地址 [点击这里](https://github.com/ppoffice/hexo-theme-icarus)

icarus 官方演示站点 [点击这里](https://blog.zhangruipeng.me/hexo-theme-icarus/)

> 在官方演示站点你还能找到很多文档没有详细说明的配置，当然了你需要基础的英语阅读能力（都有吧）

参考文章：

[Hexo | 两个你可能会用到的icarus主题配置][1]
[Hexo | 初识icarus主题中的Bulma框架][2]

[1]: https://susreal.com/article/2019/hexo-theme-icarus-2/
[2]: https://susreal.com/article/2019/hexo-theme-icarus-3/

# 调整页面和侧边栏宽度
----

我们知道的是，icarus这个主题会自动适应显示多少列，例如只有你左侧栏有Widget才会显示左侧栏，否则不会显示，右侧栏一样。

默认的页面宽度三列如下图：

![默认两列](https://cdn.jsdelivr.net/gh/adiynil/cloudimg//screenshot-7.png)

我修改之后：

![我的博客](https://cdn.jsdelivr.net/gh/adiynil/cloudimg//screenshot-6.png)

可以发现的是，同样是两列内容，我的页面内容更加饱满，对大屏幕用户更加友好。

下面是我修改的地方

## style.styl 的修改
----

    Position: /themes/icarus/source/css/style.styl

``` css
@media screen and (min-width: screen-widescreen)
    .is-1-column .container
    .is-2-column .container
        max-width: screen-desktop - 2 * gap
        width: screen-desktop - 2 * gap
@media screen and (min-width: screen-fullhd)
    .is-2-column .container
        max-width: screen-widescreen - 2 * gap
        width: screen-widescreen - 2 * gap
    .is-1-column .container
        max-width: screen-desktop - 2 * gap
        width: screen-desktop - 2 * gap
```

这一段代码大概在21行开始，我的修改是把这四个 `2 * gap` 改成了`-1 * gap` ，如果你想调成其他宽度自行调整。

## widget.ejs 的修改
----

    Position: /themes/icarus/layout/common/widget.ejs

```java
switch (column_count()) {
    case 2:
        return 'is-4-tablet is-4-desktop is-4-widescreen';
    case 3:
        return 'is-4-tablet is-4-desktop is-3-widescreen';
}
return '';
```

我的修改是 `is-4-widescreen` 改成 `is-3-widescreen` 和 `is-3-widescreen` 改成 `is-2-widescreen`


## layout.ejs 的修改
----

    Position: /themes/icarus/layout/layout.ejs

```java
switch (column_count()) {
    case 1:
        return 'is-12';
    case 2:
        return 'is-8-tablet is-8-desktop is-8-widescreen';
    case 3:
        return 'is-8-tablet is-8-desktop is-6-widescreen' (意外发现源码少了个分号lol)
}
return '';
```

我的修改是 `is-8-widescreen` 改成 `is-9-widescreen` 和 `is-63-widescreen` 改成 `is-8-widescreen`

# 添加文章置顶功能
----

文章置顶这个小功能，用起来还是很实用的。先来看一下最终效果：

![置顶预览](https://cdn.jsdelivr.net/gh/adiynil/cloudimg//screenshot-8.png)

## _config.yml 的修改
----

    Position: /yourblog/_config.yml

```yml
index_generator:
  path: ''
  per_page: 10
  order_by: 
    top: -1
    date: -1
```

这里是吧top属性添加到排序索引里，即 `top: -1` 是加上去的。

## generator.js 的修改
----

    Position: /yourblog//⁨node_modules⁩/hexo-generator-index⁩/lib⁩/generator.js

```js
var paginationDir = config.pagination_dir || 'page';

// 把这一段加上去
posts.data = posts.data.sort(function(a, b) {
if(a.top && b.top) {
    if(a.top == b.top) return b.date - a.date;
    else return b.top - a.top;
}
else if(a.top && !b.top) {
    return -1;
}
else if(!a.top && b.top) {
    return 1;
}
else return b.date - a.date;
});
// 

var path = config.index_generator.path || '';
```

## post.md 的修改
----

    Position: /yourblog/scaffolds/post.md

```
title: {{ title }}
date: {{ date }}
tags:
top: 0
```

其中 `top: 0` 是加上去的，注意这里 `:` 和 `0` 之间是有空格的

## article.ejs 的修改
----

    Position: /yourblog/themes/icarus/layout/common/article.ejs

```jsp
<% if (post.top>0) { %>
<i class="fas fa-arrow-alt-circle-up" style="color:#3273dc"></i>
<span class="level-item" style="color:#3273dc">&nbsp;置顶</span>
<% } %>
```

这一段就加到你想要出现置顶标签的地方就可以了，预览效果就是我的[博客首页](https://yidas.cn)

# 添加文章版权标识
----

[Creative Commons](https://creativecommons.org)

先看一下预览：

![版权标识](https://cdn.jsdelivr.net/gh/adiynil/cloudimg//screenshot-9.png)

## _config.yml 的修改
----

    Position: /yourblog/themes/icarus/_config.yml

```yml
# 添加一个版权标识
# date: 2020-02-05
# 
copyright:
    enable: true
```

把这一段加到 `_config.yml` 的末尾，当然了不能只是末尾，就是怕你把参数切断而已。

## article.ejs 的修改
----

    Position: yourblog/themes/icarus/layout/common/article.ejs

在这个文件中搜索 `has_config('donate')` ，在这行的上方粘贴以下代码：

```jsp
<!-- 2020-02-05 添加文章版权标识 -->
<% if (!has_config('copyright.enable') || get_config('copyright.enable') === true) { %>
    <% if (!index) { %>
    <div class="card">
        <div class="card-content">
            <p><strong>本文作者：</strong><a target="_blank" href="<%= theme.url %>"><%= theme.author %></a></p>
            <p><strong>原始链接：</strong><a href="<%= page.permalink %>" alt="<%= page.title %>"><%= page.permalink %></a></p>
            <p><strong>版权声明：</strong>本文采用<a rel="license" target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>进行许可</p>
        </div>
    </div>
    <% } %>
<% } %>
<!-- end -->
```

完成以上修改，那么你就可以在主题的配置文件里选择是否开启版权标识功能了。

----

> *——生命不止，折腾不息*

后续的更新也会在这篇文章更新，当然了你也可以在评论区和我一起探讨。