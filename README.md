# Animaris

使用 ThinkJS + MongoDB + React + Antd 开发的移动端 WebView 接口文档系统

## 简介

Animaris 是一个移动端 WebView 接口文档以及接口 Mock 的解决方案，服务端基于 [ThinkJS](https://thinkjs.org) 和 MongoDB，前端使用了 React 和 Antd，另外接口文档部分使用了 Docsify 做适配。该程序主要是解决以下两个问题：

1. 移动端接口编写并生成可视化文档
2. 移动端接口前端开发环境模拟问题

移动端页面开发有时候会依赖客户端的接口，此时我们就必须连接真机或者模拟器进行调试，这样颇为麻烦。目前市面上常见的接口 Mock 程序都是模拟 HTTP 服务端请求接口，很少有针对客户端接口进行模拟的。

## 安装

首先你需要确保有 Node.js v8+ 以及 MongoDB v2+ 的环境，之后克隆仓库：

```
git clone git@github.com:lizheming/animaris.git
```

修改 `src/config/adapter.js` 文件中的 mongo 配置后启动即可

```
vim src/config/adapter.js:48
npm install
npm run webpack && npm start
```

启动后访问 `http://localhost:8360` 即可访问到程序。

## 文档

接口文档见：<http://localhost:8360/doc/>

## 名字

Animaris 意为仿生兽，与接口模拟有异曲同工之妙。

## 截图

文档列表页

![](https://p0.ssl.qhimg.com/t0194fc9409ff5770e2.jpg)

文档查看页

![](https://p0.ssl.qhimg.com/t01e4a2090ed1f5aed5.jpg)

Mock数据配置页

![](https://p0.ssl.qhimg.com/t015a770a88a74fa694.jpg)

## License 

[MIT](https://github.com/lizheming/animaris/blob/master/LICENSE)