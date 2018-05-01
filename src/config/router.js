module.exports = [
  [/^\/mock\/([a-z0-9]+)\.js$/i, 'index/mockjs?id=:1'],
  [/^\/api\/doc\/([a-z0-9]+)\/user(?:\/(\w+))?/i, 'api/doc/user/:2?id=:1']
];
