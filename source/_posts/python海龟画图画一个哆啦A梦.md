---
title: 用Python的海龟画图画一个哆啦A梦
date: 2020/02/18
tags: [Python,turtle]
category: []
---

一年之前学的Python，过了这么久也差不多都还给老师了。我的傻吊儿子（误）喜欢哆啦A梦，前几天花了时间专门找了很多高清的哆啦A梦的海报挂上图床，突发奇想想到用Python的turtle画图能否实现画一个哆啦A梦....

<!--more-->

## 前言
----

由于实在是~~年代久远~~学艺不精，学的一点Python也还给老师了，加上前些天看课程直播讲到了Python又把Python装了回来，所以就有了尝试用turtle来画一个哆啦A梦的想法，自己琢磨了一会发现就只能画个头画眼睛化胡须啥的，身体其他部分完全没有思路怎么去画，就干脆点直接冲浪搜了，没想到还真的有人画这个，既然有现成，代码也能看的懂，那就拷贝下来自己研究研究吧。

## 预览
----

先上一个最终的效果图吧 ☟☟☟

![turtle画图哆啦A梦](https://cdn.jsdelivr.net/gh/adiynil/cloudimg@master/doraemon/GIF.gif)

## 代码
----

```python
import turtle as t
t.speed(20)
t.pensize(4)
t.hideturtle()
t.screensize(500, 500, bg='white')
# 猫脸
t.fillcolor('#00A1E8')
t.begin_fill()
t.circle(120)
t.end_fill()
t.pensize(2)
t.fillcolor('white')
t.begin_fill()
t.circle(100)
t.end_fill()
t.pu()
t.home()
t.goto(0, 134)
t.pd()
t.pensize(2)
t.fillcolor("#EA0014")
t.begin_fill()
t.circle(18)
t.end_fill()
t.pu()
t.goto(7, 155)
t.pensize(1)
t.color('white', 'white')
t.pd()
t.begin_fill()
t.circle(4)
t.end_fill()
t.pu()
t.goto(-30, 160)
t.pensize(2)
t.pd()
t.color('black', 'white')
t.begin_fill()
a = 0.4
for i in range(120):
    if 0 <= i < 30 or 60 <= i < 90:
        a = a+0.08
        t.lt(3) #向左转3度
        t.fd(a) #向前走a的步长
    else:
        a = a-0.08
        t.lt(3)
        t.fd(a)
t.end_fill()
t.pu()
t.goto(30, 160)
t.pensize(2)
t.pd()
t.color('black', 'white')
t.begin_fill()
for i in range(120):
    if 0 <= i < 30 or 60 <= i < 90:
        a = a+0.08
        t.lt(3)  # 向左转3度
        t.fd(a)  # 向前走a的步长
    else:
        a = a-0.08
        t.lt(3)
        t.fd(a)
t.end_fill()
t.pu()
t.goto(-38,190)
t.pensize(4)
t.pd()
t.right(-30)
t.forward(15)
t.right(70)
t.forward(15)
t.pu()
t.goto(15, 185)
t.pensize(2)
t.pd()
t.color('black', 'black')
t.begin_fill()
t.circle(13)
t.end_fill()
t.pu()
t.goto(13, 190)
t.pensize(1)
t.pd()
t.color('white', 'white')
t.begin_fill()
t.circle(5)
t.end_fill()
 
t.pu()
t.home()
t.goto(0, 134)
t.pensize(2)
t.pencolor('black')
t.pd()
t.right(90)
t.forward(40)
t.pu()
t.home()
t.goto(0, 124)
t.pensize(1)
t.pencolor('black')
t.pd()
t.left(10)
t.forward(80)
t.pu()
t.home()
t.goto(0, 114)
t.pensize(1)
t.pencolor('black')
t.pd()
t.left(6)
t.forward(80)
t.pu()
t.home()
t.goto(0,104)
t.pensize(1)
t.pencolor('black')
t.pd()
t.left(0)
t.forward(80)
# 左边的胡子
t.pu()
t.home()
t.goto(0,124)
t.pensize(1)
t.pencolor('black')
t.pd()
t.left(170)
t.forward(80)
t.pu()
t.home()
t.goto(0, 114)
t.pensize(1)
t.pencolor('black')
t.pd()
t.left(174)
t.forward(80)
t.pu()
t.home()
t.goto(0, 104)
t.pensize(1)
t.pencolor('black')
t.pd()
t.left(180)
t.forward(80)
t.pu()
t.goto(-70, 70)
t.pd()
t.color('black', 'red')
t.pensize(2)
t.seth(-60)
t.begin_fill()
t.circle(80,40)
t.circle(80,80)
t.end_fill()
t.pu()
t.home()
t.goto(-80,70)
t.pd()
t.forward(160)
t.pu()
t.home()
t.goto(-50,50)
t.pd()
t.pensize(1)
t.fillcolor("#eb6e1a")
t.seth(40)
t.begin_fill()
t.circle(-40, 40)
t.circle(-40, 40)
t.seth(40)
t.circle(-40, 40)
t.circle(-40, 40)
t.seth(220)
t.circle(-80, 40)
t.circle(-80, 40)
t.end_fill()
# 领带
t.pu()
t.goto(-70, 12)
t.pensize(14)
t.pencolor('red')
t.pd()
t.seth(-20)
t.circle(200, 30)
t.circle(200, 10)
# 铃铛
t.pu()
t.goto(0, -46)
t.pd()
t.pensize(1)
t.color("black", '#f8d102')
t.begin_fill()
t.circle(25)
t.end_fill()
t.pu()
t.goto(-5, -40)
t.pd()
t.pensize(2)
t.color("black", '#79675d')
t.begin_fill()
t.circle(5)
t.end_fill()
t.pensize(3)
t.right(115)
t.forward(7)
t.mainloop()
```

----

> 最后推荐一个很适合新手入门的Python社区—— <https://python123.io> ，是我们老师以前上课的时候安利给我们的，主要是里面东西都比较浅显易懂，Python是我觉得而且大部分人都这么觉得入门最简单的编程语言了。
