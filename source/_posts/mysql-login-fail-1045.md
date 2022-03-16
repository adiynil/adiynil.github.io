---
title: 解决MySQL数据库登陆失败1045权限错误
date: 2020/12/17 17:51
category: []
tags: [mysql]

---


从做完JavaWeb的项目之后，好久没打开过本地的MySQL，今天一打开突然就打不开了，反复确认了MySQL服务是在运行中，仍然是报1045权限错误。

<!--more-->

本地的MySQL只是用来调试，所以密码设置的很简单，也即是说不是因为密码错误才会出现1045错误，具体我也不了解，但是好像如果好久打开过MySQL就会大概率性遇到这个错误。

首先打开MySQL安装目录，找到`my.ini`文件，MySQL的配置文件，打开找到`[mysqld]`这一行，在下面加一行
```
skip-grant-tables
```
然后保存，注意如果你的MySQL安装在C盘，得用管理员权限打开编辑器才能保存。然后打开服务管理重启MySQL，具体是`win+r`输入`services.msc`回车。

然后打开MySQL，在输入密码的时候直接回车就可以进入了，进去之后
```
use mysql;
update user set password=password('123') where user = 'root' and host = 'localhost';
flush privileges;
```
再次重启MySQL服务，登陆的时候输入你设置的密码就可以登录了。