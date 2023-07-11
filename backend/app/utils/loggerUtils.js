const { configure, getLogger } = require("log4js");

configure({
  appenders: {
    out: { type: "stdout" },
    app: {
      type: "file",
      filename: "./logs/application.log",
      keepFileExt: true,
      pattern: "yyyy-MM-dd",
      alwaysIncludePattern: true,
      backups: 90,
      numBackups: 90,
    },
  },
  categories: {
    default: {
      appenders: ["out", "app"],
      level: "debug",
    },
  },
});

const logger = getLogger();

module.exports = logger;
