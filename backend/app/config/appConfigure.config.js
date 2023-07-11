const express = require("express");
const helmet = require("helmet");
var cors = require("cors");

const configureExpressApp = (app) => {
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  // app.use(express.bodyParser({ limit: "50mb" }));
  app.use(helmet());
  // app.use(auditDateSetter.setReqDate);

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));
};

module.exports = configureExpressApp;
