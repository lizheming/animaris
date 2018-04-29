const path = require('path');
const routerREST = require('think-router-rest');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(doc|static|favicon\.ico)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev,
      error(err) {
        if (think.isPrevent(err)) {
          return false;
        }
        console.error(err);
      }
    }
  },
  {
    handle: 'payload',
    options: {
      keepExtensions: true,
      limit: '5mb'
    }
  },
  {
    handle: 'router',
    options: {}
  },
  {handle: routerREST},
  'logic',
  {
    handle: 'controller',
    options: {
      emptyController: 'index'
    }
  }
];
