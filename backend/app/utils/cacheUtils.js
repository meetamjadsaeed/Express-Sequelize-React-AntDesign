const NodeCache = require("node-cache");
const myCache = new NodeCache();

const setCache = (key, obj, ttl = 0) => {
  myCache.set(key, obj, ttl);
};

const getCache = (key) => {
  value = myCache.get(key);

  if (value == undefined) {
    return false;
  }
  return value;
};

const deleteCache = (key) => {
  myCache.del(key);
};

module.exports = {
  setCache,
  getCache,
  deleteCache,
};
