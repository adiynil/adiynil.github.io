---
title: 一文搞懂CSS Flex布局
date: 2021/03/27 19:21
category: []
tags: [css, flex]
---

css中，flex、grid 各种布局都是我们必须掌握的，作为常用功能又强大的flex布局你还没学会吗，全文没有一张图，用最通俗易懂的语言教你怎么用css中的flex布局。

<!--more-->

## 父容器属性

### 开启flex

```css
display: flex;
```

### 控制子元素水平方向对齐

```css
justify-content: flex-start/center/flex-end/space-between/space-around/space-evenly;
```

> `flex-start/center/flex-end` 子元素之间没有留白
>
> `space-between/space-around/space-evenly` 子元素之间留白相等

- `flex-start` => `[ a b c ######## ]`
- `center` => `[ #### a b c #### ]`
- `flex-end` => `[ ######## a b c ]`
- `space-between` => `[ a ### b ### c ]`  (两端无留白)
- `space -evenly` => `[ ## a ## b ## c ## ]` (两端留白和子元素之间留白相等)
- `space-around` => `[ # a ###  b ### c # ] ` (两端留白是子元素之间留白的一半)

> **以上是针对于父容器的`flex-direction`属性为行模式的时候**
>
> **列模式时，`justify-content`和`align-items`的作用倒转过来，分别是**
>
> - **`justify-content` => 控制垂直方向对齐**
>- **`align-items` => 控制水平方向对齐**

**[什么是行模式和列模式？](#### 行模式&列模式)**

### 控制子元素垂直方向对齐

```css
align-items: flex-start/center/flex-end/stretch/baseline;
```

- `flex-start/center/flex-end` 和上边类似，就是方向换成垂直方向
- `baseline` => 按照文字基线对齐
- `stretch` => 子元素拉伸并在垂直方向铺满父容器

> **以上是针对于父容器的`flex-direction`属性为行模式的时候**
>
> **列模式时，`justify-content`和`align-items`的作用倒转过来，分别是**
>
> - **`justify-content` => 控制垂直方向对齐**
>- **`align-items` => 控制水平方向对齐**

**[什么是行模式和列模式？](#### 行模式&列模式)**

### 控制子元素排列方式

```css
flex-direction: row/column/row-reverse/column-reverse;
```

- `row` => 按行排列从左到右
- `row-reverse` => 按行排列从右到左
- `column` => 按列从上到下，子元素的宽度不需要撑满父容器
- `column-reverse` => 按列从下到上，子元素的宽度不需要撑满父容器

#### 行模式&列模式

- 父容器的`flex-direction`属性为`row`/`row-reverse` => **行模式**
- 父容器的`flex-direction`属性为`column`/`column-reverse` => **列模式**

### 控制子元素的折行

```css
flex-wrap: wrap/nowrap;
align-content: flex-start/flex-end/center/space-between/space-evenly/space-around;
```

当`flex-wrap`的值为`wrap`的时候，折行的部分由`align-content`的属性来控制，其值的作用可参考`justify-conten`，当然了，折行发生的条件是子元素的宽度固定且不能收缩，并且超过了父容器的宽度

----------------------------------------



## 子元素属性



### 子元素覆盖父容器的排列方式

```css
align-seft: flex-start/center/flex-end/stretch/baseline;
margin: auto;
```

- `align-seft` => 覆盖父容器设置的`align-items`属性
- `margin` => 覆盖父容器的`justify-content`属性

### 子元素的空间占比

```css
flex: 1;
```

- `flex`属性的值表示该子元素占父容器的空间比，总容量是所有子元素的`flex`属性和

### 子元素的增长

```css
flex-grow: 1;
```

`flex-grow`属性是指当父容器的空间还有空余的时候，子元素主动增长去撑满这些**空余空间**(**行模式下是宽度，列模式下是高度**)，而占这些空余空间的比列就是由`flex-grow`的值来决定的，默认不设置`flex-grow`的情况下，值为`0`，子元素不会主动增长

当把所有的子元素的`flex-grow`都设置成相等 => `[ a-a-a b-b-b c-c-c]`

或者中间的子元素的`flex-grow`是两边的子元素`flex-grow`的两倍 => `[ a-a b-b-b-b c-c]`

### 子元素的收缩

```css
flex-shrink: 1;
```

`flex-shrink`属性和`flex-grow`属性相似，只不过作用在于收缩的时候，`flex-shrink`越大的子元素在收缩的时候收缩的高度/宽度更大，默认不设置`flex-shrink`的情况下，值为`1`，子元素收缩且收缩比例为`1`

中间的子元素的`flex-shrink`是两边子元素`flex-shrink`的两倍 :

`[ a-a-a-a-a-a b-b-b-b-b-b c-c-c-c-c-c- ]`  ->  `[ a-a-a-a b-b c-c-c-c ]`

### 子元素的宽度/高度

```css
flex-basis: 200px;
```

- 行模式 => `flex-basis`控制子元素的宽度
- 列模式 => `flex-basis`控制子元素的高度

**[什么是行模式和列模式？](#### 行模式&列模式)**

- 行模式下，如果设置了`flex-basis`，则子元素设置的`width`属性不会生效，`flex-basis`没有设置的情况下默认值为`auto`，也就是由内容决定
- 列模式下，如果设置了`flex-basis`，则子元素设置的`height`属性不会生效，`flex-basis`没有设置的情况下默认值为`auto`，也就是由内容决定

> 但是，虽然`width/height`属性会被覆盖，我们依然可以用`min-width/min-height`来限制最小宽高



### 子元素的flex属性

```css
flex: 0 1 auto;
```

`flex`属性的值其实就是`flex-grow`、`flex-shrink`、`flex-basis` 这3种属性的缩写，默认值就是`0 1 auto`，也就对应

```
flex-grow: 0;
flex-shrink: 1;
flex-basis: auto;
```

即**不增长**，**收缩比例为1**，**宽度/高度为内容的宽度/高度**

