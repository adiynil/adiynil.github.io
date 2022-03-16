---
title: 仿Google Design的导航栏和卡片设计
date: 2019/11/14
category: 个人笔记
tags: [Google,CSS,HTML]
---

纯CSS仿制[Google Design](https://design.google/library/)的导航栏和卡片信息。

<!-- more -->

> 由于要设计一个网页作为期末作业，所以我简单仿了一个Google Design的导航栏和卡片信息

前后导航栏对比：

![Google Design](https://cdn.jsdelivr.net/gh/adiynil/cloudimg@master/1573738565037-gdnavbar.png)

![My design](https://cdn.jsdelivr.net/gh/adiynil/cloudimg@master/1573738605580-mydsnavbar.png)

----

## 导航栏HTML和CSS

- HTML

```html
<div class="nav">
			<ul>
				<div class="logo">
					<img src="img/afeilogo.png">
				</div>
				<div class="left">
					<li><a class="active" href="#home">主页</a></li>
					<li><a href="#news">新闻</a></li>
					<li><a href="#contact">联系</a></li>
					<li><a href="#about">关于</a></li>
				</div>
				<div class="right">
					<li><a href="#contact"><span class="glyphicon glyphicon-user"></span>&nbsp;登录</a></li>
				</div>
			</ul>
		</div>
```

- CSS

```css
.nav ul {
			z-index: 999;
		    list-style-type: none;
		    margin: 0;
		    padding: 0;
		    overflow: hidden;
		    background-color: #FFFFFF;
		    position: fixed;
		    top: 0;
		    width: 100%;
			box-shadow:0px 0px 4px #aaaaaa;
		}
		
		.nav  ul .left li{
		    float: left;
		}
		.nav  ul .right li{
		    float: right;
		}
		.nav  ul li a {
			margin-left: 5px;
			margin-right: 5px;
		    display: block;
		    color: gray;
		    text-align: center;
		    padding: 16px 18px;
		    text-decoration: none;
		}
		
		.nav  ul .left li a:hover:not(.active) {
		    border-bottom: 4px lightgray solid;
		}
		
		.nav  ul .right li a:hover:not(.active) {
		    color: #000000;
		}
		
		.nav  ul .left li .active {
			border-bottom: 4px blue solid;
		    color: black;
			font-weight: bold;
		}
               .logo {
			margin-top: 1px;
			margin-left: 40px;
			
			float: left;
			width: 250px;
			height: inherit;
		}
		.logo img {
			width: 100%;
		}
		
		.content {
			display: block;
			padding: 0px;
			padding-left: 40px;
			padding-right: 40px;
			margin-top: 70px;
			background-color: #FFFFFF;
		}
```

----

卡片信息前后对比：

![Google Design](https://cdn.jsdelivr.net/gh/adiynil/cloudimg@master/1573739071036-ss.png)

![My design](https://cdn.jsdelivr.net/gh/adiynil/cloudimg@master/1573739167792-dd.png)

## 卡片信息HTML和CSS

- HTML

```html
<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="content">
						<div class="breadcrumbs">
							<label><span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;首页&nbsp;></label>
							<label id="leb" class="">当前&nbsp;></label>
							<label id="leb" class="">当前&nbsp;></label>
							<label id="leb" class="active">当前</label>
						</div>
						<div class="big">
							<img src="img/test3.jpg">
							<div class="title">首页超大图的标准长两行的标题，最多只能显示两行如果两行就会是这个亚子的</div>
							<div class="desc">如果是中文呢如果是中文呢如果是中文呢如果是中文呢，谁知道呢，中文字体不太好看的亚子啊
							那可怎么办呢，真难搞。</div>
							<div class="link"><a href="#">继续阅读...</a></div>
						</div>
					</div><!-- content end -->
				</div>
				<div class="col-12">
					<div class="content-a">
						<div class="col-4">
							<div class="style-a">
								<div class="thumbnail">
									<a href=""><img src="img/test.jpg" /></a>
								</div>
								<div class="content">
									<div class="headline">
										<label id="thislb"></label>这是一条标准的中文标题，也许会很长呢
									</div>
									<div class="desc-content">
										如果是中文呢如果是中文呢如果是中文呢如果是中文呢，谁知道呢，中文字体不太好看的亚子啊
									</div>
									<div class="info">
										<div class="left"><a href="#"><img src="img/avatar.jpg" />
										<span>Afei</span></a></div>
										<div class="right"><a href="#">#人文#</a></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-4">
							<div class="style-a">
								<div class="thumbnail">
									<a href=""><img src="img/test2.jpg" /></a>
								</div>
								<div class="content">
									<div class="headline">
										Title of a longer featured blog post
									</div>
									<div class="desc-content">
										Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most
										interesting in this post's contents.
									</div>
									<div class="info">
										<div class="left"><a href="#"><img src="img/avatar.jpg" />
										<span>Afei</span></a></div>
										<div class="right"><a href="#">#Views#</a></div>
									</div>
								</div>
							</div>
						</div>
						<div class="col-4">
							<div class="style-a">
								<div class="thumbnail">
									<a href=""><img src="img/test2.jpg" /></a>
								</div>
								<div class="content">
									<!-- headline或者desc-content -->
									<div class="info">
										<div class="left"><a href="#"><img src="img/avatar.jpg" />
										<span>Afei</span></a></div>
										<div class="right"><a href="#">#Views#</a></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div><!-- row end -->
		</div><!-- container end -->
```

- CSS

```css
.content-a {
		display: block;
		padding: 0px;
		padding-left: 20px;
		padding-right: 20px;
		margin-bottom: 20px;
		margin-top: 10px;
		background-color: #FFFFFF;
	}
	
	.style-a {
		width: 100%;
		height: auto;
		padding: 20px;
		overflow: hidden;
		max-height: 500px;
		border-bottom: 3px white solid;
		border-bottom-right-radius: 3px;
		border-bottom-left-radius: 3px;
	}
	.style-a:hover {
		box-shadow:0px 0px 4px #aaaaaa;
		border-bottom: 3px blue solid;
		
	}
	.style-a .thumbnail {
		width: 100%;
		max-height: 300px;
		overflow: hidden;
	}
	.style-a .thumbnail img {
		width: 100%;
	}
	.style-a .content {
		margin: 0;
		padding: 0;
	}
	.style-a .content .headline {
		margin: 0;
		padding: 0;
		margin-top: 15px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 16px;
		font-weight: bold;
	}
	.style-a .content .desc-content {
		margin: 0;
		padding: 0;
		margin-top: 10px;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 14px;
	}
	.style-a .content .info {
		margin: 0;
		padding: 0;
		margin-top: 10px;
		font-size: 12px;
		font-weight: bold;
		
	}
	.style-a .content .info img {
		height: 20px;
		border-radius: 50%;
		vertical-align: middle;
	}
	.style-a .content .info a {
		text-decoration: none;
		color: dimgray;
	}
	.style-a .content .info a:hover {
		color: royalblue;
	}
	
	.style-a .content .info .left {
		float: left;
	}
	.style-a .content .info .left span {
		margin-left: 4px;
	}
	.style-a .content .info .right {
		float: right;
	}
```