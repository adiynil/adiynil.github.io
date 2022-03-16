---
title: Mysql5.5版本中日期默认为CURRENT_TIMESTAMP报错
date: 2021/02/21 15:16
category: []
tags: [mysql]
---


建表的时候发现设置create_time列的默认值为CURRENT_TIMESTAMP时报错了，无非是两种报错：

- 数据类型是datetime导致报错
- 通个表同时存在两个字段为CURRENT_TIMESTAMP

这是因为在Mysql5.6.5（也有说是5.6）版本之前，datetime类型的字段不会自动初始化并更新当前日期和时间，而timestamp类型的字段可以，并且每个表只能包含一个timestamp字段，而在此之后的版本，timestamp和datetime字段都可以自动初始化并更新当前日期和时间，并且没有限制字段数。

解决方法也很简单：

1. 升级到Mysql5.6.5版本或以上
2. 创建触发器trigger来自动更新字段值

