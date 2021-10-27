---
title: vue中整合editor.md
date: 2021/3/23 22:12
tags: [vue,editor.md]
category: []
---

在做毕设过程中需要在前端用到Markdown编辑器，一想就想到了Editor.md，虽然有和Vue整合好的mavonEditor可供选择，但是还是喜欢Editor.md，就想办法搞一下。

Editor.md作为一个很成熟开元Markdown编辑器，虽然已经好久不更新了，但是无疑还是非常实用的，由于Editor.md并没有提供与Vue整合的直接方案，但是我们可以自己把它封装成一个Vue组件来使用。

<!--more-->

参考了两篇文章：

> https://blog.csdn.net/jdbdh/article/details/90314447
>
> http://www.lwl.tech/post/3

首先了解到Editor.md是通过附着在window对象上来暴露给用户使用的，并且在初始化的时候依赖了jQuery，那么我们要解决：

1. 把jQuery挂载到window对象

2. 异步加载editormd.mi.js后创建editor示例

*MarkdownEditor.vue*

```vue
<template>
  <div class="markdown-editor-box">
    <link rel="stylesheet" href="/static/editormd/css/editormd.min.css" />
    <link rel="stylesheet" :href="'/static/editormd/css/themes/' + themeCode" />
    <div :id="id"></div>
  </div>
</template>
<script>
import $ from "jquery";
import { v4 as uuid } from "uuid";
import { defaultConfig } from "../../config/editor.md";

export default {
  name: "MarkdownEditor",
  props: {
    id: {
      type: String,
      default: uuid(),
    },
    config: {
      type: Object,
    },
    themeCode: {
      type: String,
      default: "atelier-forest-light.min.css",
      // preview at https://jmblog.github.io/color-themes-for-google-code-prettify/
      // location /static/editormd/css/themes/
    },
    initData: {
      type: String,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      editor: null,
    };
  },
  methods: {
    getConfig: function () {
      // return Object.assign(defaultConfig, this.config);
      // or
      return { ...defaultConfig, ...this.config };
      // maybe add custom config from back-end
      // return { ...defaultConfig, ...this.config, ...customConfig };
    },
    initEditor: function () {
      let vm = this;
      window.$ = window.jQuery = $;
      (async () => {
        await $.getScript("/static/editormd/editormd.min.js");
        let editor = window.editormd(this.id, this.getConfig());
        vm.editor = editor;
        // this.$nextTick(() => {
        //   let editor = window.editormd(this.editorId, this.getConfig());
        //   editor.on("load", () => {
        //     setTimeout(() => {
        //       // hack bug: 一个页面多个编辑器只能初始化其中一个数据问题
        //       this.editorLoaded = true;
        //       this.initData && editor.setMarkdown(this.initData);
        //     }, this.initDataDelay);
        //   });
        //   this.onchange &&
        //     editor.on("change", () => {
        //       let html = editor.getPreviewedHTML();
        //       this.onchange({
        //         markdown: editor.getMarkdown(),
        //         html: html,
        //         text: window.$(html).text(),
        //       });
        //     });
        //   this.editor = editor;
        // });
      })();
    },
  },
  mounted: function () {
    let vm = this;
    vm.initEditor();
  },
  watch: {
    initData: function (newVal) {
      if (newVal) {
        this.editorLoaded && this.editor.setMarkdown(newVal);
      }
    },
  },
};
</script>
```

```
"undo","redo","|","bold","del","italic","quote","ucwords","uppercase","lowercase","h1","h2","h3","h4","h5","|","list-ul","list-ol","hr","|","link","reference-link","image","code","preformatted-text","code-block","table","datetime","emoji","html-entities","pagebreak","goto-line","watch","preview","fullscreen","clear","search","help","info"
```

```
"undo","redo","|","bold","del","italic","quote","list-ul","list-ol","hr","|","h1","h2","h3","|","link","image","code-block","table","||","watch","preview","fullscreen","clear","search"
```

