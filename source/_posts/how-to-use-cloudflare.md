---
title: 如何使用Cloudflare来加速我的GitHub Page
date: 2020/02/04
tags: [CloudFlare,Hexo,GitHub Page,GitHub]
category: 干货
---

我用了两天时间搭建起来的站点，依赖于GitHub的Page服务，域名是在腾讯云购买的，但是众所周知的是GitHub现在基本是半墙的状态，如果你不能快乐地上网，那么很可能不能愉快的访问GitHub，都已经用GitHub来搭建站点了，那么就要想法子来白嫖CDN来加速我的站点在国内的访问速度。

<!-- more -->

----

## 前言

我的站点是依赖Hexo搭建在GitHub Page上的博客系统，本身就已经很轻量了，但是苦于国内访问确实慢，~~但是又没钱~~，所以只能白嫖Cloudflare的CDN，尽管Cloudflare也日常会抽风，但是起码有一点加成。

----

## 在Cloudflare添加站点

你需要先注册一个 [Cloudflare](https://www.cloudflare.com/) 的账号，这个不赘述了，然后添加你的站点  

![添加站点](https://cdn.jsdelivr.net/gh/adiynil/cloudimg//screenshot-1.png)  

我们知道的是，Cloudflare免费套餐只能通过NS方式接入，这样用起来不够灵活、生效很慢（0~72小时），而且最重要的问题是没法在解析的时候手工解析到Cloudflare节点IP地址，这就达不到我的目的——指定节点解析。  

>指定节点解析有什么用呢，比如说我用的是默认的解析，在国内访问可能会走美国的节点，就打不到加速的目的了，我的目的就是白嫖Cloudflare的香港节点，或者是日本、韩国的节点都比较快。

----

## 接入第三方管理平台

这里我用到了第三方的Cloudflare管理平台 [BNXB](https://cdn.bnxb.com/) ，用API接入Cloudflare的账号来管理站点。通过这个平台我就可以用CNAME来解析我的站点来使用Cloudflare的CDN加速了，注意要选择CNAME解析。  

配置好了之后的截图应该是这样的：

![BNXD配置](https://cdn.jsdelivr.net/gh/adiynil/cloudimg//screenshot-2.png)  

你需要在你的域名服务商那里添加一条CNAME记录解析到 [BNXB](https://cdn.bnxb.com/) 给你提供的地址，你可以在 `解析设置` 里看到对应的地址。解析了之后你要访问一次你的域名来激活SSL证书（当然你得有）。

到了这一步你可以配置你的CDN了，你可以选择在 [Cloudflare](https://www.cloudflare.com/) 配置，或者如果你的英语不太好可以选择在 [BNXB](https://cdn.bnxb.com/) 配置，已经中文本土化了。详细的配置应该怎么配置可以百度有很多配置教程。

## 自定义解析节点

用第三方管理平台来管理Cloudflare不用NS接入，那么我们完全可以自己定义解析节点，只要是Cloudflare的节点就可以。  

Cloudflare自己发布节点的页面是 [IP Changes](https://www.cloudflare.com/ips/)  

部分网友整理的节点有：  

### 移动联通推荐

``` code
104.23.240.0-104.23.243.254
```

### 电信推荐

``` code
162.159.208.4-162.159.208.103
162.159.209.4-162.159.209.103
162.159.210.4-162.159.210.103
162.159.211.4-162.159.211.103
```

> 这里可以在自己的域名服务商那里自定义使用哪个节点，各个节点不一定都可以使用，自己测试觉得可以再用吧

修改完解析记录，等待DNS生效即可。