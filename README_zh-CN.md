<div align="center">
  <a href="https://github.com/lizheming/animaris">
    <img width="315" heigth="170" src="https://s5.ssl.qhres.com/static/4a0fac0dd5f0cae2.svg">
  </a>  

  <h1>Animaris</h1>

  <div>
    <a href="https://github.com/lizheming/animaris">
      <img src="https://img.shields.io/badge/node-%3E%3D8.9.4-red.svg?style=flat-square" alt="node version required" />
    </a>
    <a href="https://github.com/lizheming/animaris/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/lizheming/animaris.svg?colorB=f48041&style=flat-square" alt="License">
    </a>
    <a href="https://hub.docker.com/r/lizheming/animaris">
      <img src="https://img.shields.io/microbadger/image-size/lizheming/animaris.svg?style=flat-square&logo=dockbit" alt="MicroBadger Size">
    </a>
    <a href="https://hub.docker.com/r/lizheming/animaris">
      <img src="https://img.shields.io/microbadger/layers/lizheming/animaris.svg?style=flat-square&logo=dockbit" alt="MicroBadger Layers">
    </a>
    <a href="https://discord.gg/ZCD8yc5">
      <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?style=flat-square&logo=discord" alt="Chat">
    </a>
  </div>

  <p>使用 ThinkJS + MongoDB + React + Antd 开发的移动端 WebView 接口文档系统</p>
</div>

## 简介

Animaris 是一个移动端 WebView 接口文档以及接口 Mock 的解决方案，服务端基于 [ThinkJS](https://thinkjs.org) 和 MongoDB，前端使用了 React 和 Antd，另外接口文档部分使用了 Docsify 做适配。该程序主要是解决以下两个问题：

1. 移动端接口编写并生成可视化文档
2. 移动端接口前端开发环境模拟问题

移动端页面开发有时候会依赖客户端的接口，此时我们就必须连接真机或者模拟器进行调试，这样颇为麻烦。目前市面上常见的接口 Mock 程序都是模拟 HTTP 服务端请求接口，很少有针对客户端接口进行模拟的。

## 安装

### Docker Compose

使用 [docker-compose](https://docs.docker.com/compose/) 你可以非常轻松的启动 Animaris。项目根目录有一个 `docker-compose.yml` 提供了默认的配置，你可以直接使用它启动也可以自行配置。项目依赖的一些环境变量会在下方进行说明：

```yaml
version: '2'

services: 
  animaris:
    image: lizheming/animaris:latest
    ports: 
      - 8360:8360
    restart: always
    environment:
      # mongo database setting
      - MONGO_HOST=mongo
      - MONGO_PORT=27017
      - MONGO_DATABASE=animaris
      # If your mongo setting have user auth you should add below enviroment
      # - MONGO_USER=admin
      # - MONGO_PASSWORD=admin

  mongo:
    image: mongo
    environment:
      # mongo data path
      - MONGO_DATA_DIR=/data/db
    volumes: 
      - ./runtime/data:/data/db
    command: mongod --smallfiles
```
修改好后直接执行 `docker-compose -f docker-composer.yml up` 就算启动成功了。之后访问 `http://localhost:8360` 即可访问到程序。

### 普通安装

如果你没有使用 docker，你也可以用正常的方法安装项目。首先你需要确保有 Node.js v8+，之后克隆仓库：

```
git clone git@github.com:lizheming/animaris.git
```

修改 `src/config/adapter.js` 文件中的 mongo 配置后安装依赖

```
vim +48 src/config/adapter.js
npm install
```

编译前端资源之后即可启动服务

```
npm run webpack 
npm start
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