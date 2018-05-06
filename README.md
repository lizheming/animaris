# Animaris

[![node version required](https://img.shields.io/badge/node-%3E%3D8.9.4-red.svg?style=flat-square)](https://github.com/lizheming/animaris)
[![License](https://img.shields.io/github/license/lizheming/animaris.svg?colorB=f48041&style=flat-square)](https://github.com/lizheming/animaris/blob/master/LICENSE)
![MicroBadger Size](https://img.shields.io/microbadger/image-size/lizheming/animaris.svg?style=flat-square&logo=dockbit)
![MicroBadger Layers](https://img.shields.io/microbadger/layers/lizheming/animaris.svg?style=flat-square&logo=dockbit)
[![Chat](https://img.shields.io/badge/chat-on%20discord-7289da.svg?style=flat-square&logo=discord)](https://discord.gg/ZCD8yc5)

Documentation and Mock for Mobile WebView APIs base on ThinkJS & MongoDB & React & Antd.

[简体中文文档](https://github.com/lizheming/animaris/blob/master/README_zh-CN.md)

## Introduction

Animaris is a system to resolve problem about mobile webview api documentation and mock. We use [ThinkJS](https://thinkjs.org) and MongoDB for server, React and [Antd](https://ant.design) for front end, [Docsify](http://docsify.js.org) for documentation at last. Animaris fixed follow questions:

1. A visual documentation for Mobile WebView API.
2. How mock Mobile WebView API.

If your Mobile web page depend on WebView API, you should inspect to simulator or physical machine. It's very terrible. All we know api mock program usually support server http api, there has little mock webview api program.

## Installation

### Docker Compose

You can easily run animaris using [docker-compose](https://docs.docker.com/compose/). Project have an example config named `docker-compose.yml` for you. You can use it directly or config it.  It relies on a number of environment variables that you can set before running `docker-compose up`. The variables are described below.

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

After run `docker-compose -f docker-composer.yml up`, you can open `http://localhost:8360` to view program.

### Normal Install

If you don't use docker, you also can install it with common method. First of all you should have Node.js v8+, and then clone repo:

```
git clone git@github.com:lizheming/animaris.git
```

Modify `src/config/adapter.js` with your mongo config and then install dependencies.

```
vim +48 src/config/adapter.js
npm install
```

Then compile js and start server.

```
npm run webpack
npm start
```

After start, you can open `http://localhost:8360` to view program.

## Documentation

After start, you can see RESTful APIs documentation at <http://localhost:8360/doc/>.

## Name

Animaris means machines like humans, that's function same as Mock.

## Screenshot

Documentation List

![](https://p0.ssl.qhimg.com/t0194fc9409ff5770e2.jpg)

Documentation view page

![](https://p0.ssl.qhimg.com/t01e4a2090ed1f5aed5.jpg)

Mock data setting page

![](https://p0.ssl.qhimg.com/t015a770a88a74fa694.jpg)

## License 

[MIT](https://github.com/lizheming/animaris/blob/master/LICENSE)