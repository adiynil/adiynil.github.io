---
title: js获取在线视频的第一帧作为封面
date: 2022/03/14 16:09
tag: []

category: [个人笔记]
---

最近碰到一个需求，要求获取在线视频文件的第一帧画面作为视频的封面图片，项目中使用的是 xgplayer 播放器，封面 poster 要求传封面的 url。
思路：用 canvas 绘出画面 - 转成 base64 - base64 转成 File - 获取 File 的本地预览地址

<!--more-->

## 获取 base64 格式的封面

这里 video 元素需添加 autoplay 属性，否则在一些浏览器上获取到的画面是黑的。还有就是先把 video 元素添加到 body 标签再移除，有时候会碰到视频在后台播放，用户根本没有可操作的地方。

```ts
export const getVideoBase64 = (url: string) =>
  new Promise(function (resolve) {
    let dataURL = ''
    let video = document.createElement('video')
    video.setAttribute('crossOrigin', 'anonymous') //处理跨域
    video.setAttribute('src', url)
    video.setAttribute('width', 880 + '')
    video.setAttribute('height', 495 + '')
    video.setAttribute('autoplay', 'autoplay')
    document.body.appendChild(video)
    video.addEventListener('loadeddata', function () {
      let canvas = document.createElement('canvas'),
        width = width, //canvas的尺寸和图片一样
        height = height
      canvas.width = video.width
      canvas.height = video.height
      canvas.getContext('2d')!.drawImage(video, 0, 0, width, height) //绘制canvas
      dataURL = canvas.toDataURL('image/jpeg') //转换为base64
      document.body.removeChild(video)
      resolve(dataURL)
    })
  })
```

## base64 格式转成 File，再由 File 生成本地预览链接

之所以要这样做是因为 xgplayer 要求设置的封面 poster 是一个 url，否则直接吧 base64 格式的数据设置为 image 标签的 src 属性即可显示封面图。当然我们也可以把这个操作放在上传视频的时候，生成的封面直接传给后端存起来，就不用每次都生成本地预览链接。本地预览链接只在本地生效，且是在缓存里，也只能用于预览封面了。

```ts
export const base64ImgtoFile = (dataurl: string, filename = 'file') => {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.\*?);/)![1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  })

export const getLocalPreviewUrl = (file: File) => URL.createObjectURL(file)

export const getOnlineVideoCover = async (url: string) =>
  getLocalPreviewUrl(base64ImgtoFile((await getVideoBase64(url)) as string))
```

![image-20220316143409091](https://cdn.jsdelivr.net/gh/adiynil/storage/2022/03/16/image-20220316143409091-bbd19229.png)
