---
title: js获取在线视频的第一帧作为封面
date: 2022/03/14 16:09
tag: []
category: [个人笔记]
---

最近碰到一个需求，要求获取在线视频文件的第一帧画面作为视频的封面图片，项目中使用的是 xgplayer 播放器，封面 poster 要求传封面的 url，但是又刚好

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
export const base64ImgtoFile = (dataurl: string, filename = 'file') => {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)![1]
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
}

export const getLocalPreviewUrl = (file: File) => URL.createObjectURL(file)

export const getOnlineVideoCover = async (url: string) =>
  getLocalPreviewUrl(base64ImgtoFile((await getVideoBase64(url)) as string))
```
