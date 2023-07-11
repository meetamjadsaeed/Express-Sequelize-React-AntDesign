// const AuditLogsService = require("../services/auditlog.service");
const logger = require("./loggerUtils");

const sendResponse = async (res, req, data, message, success, code) => {
  const responseObj = {
    data,
    message,
    success,
  };

  res.locals.response_body = {
    data,
    message,
    code,
  };
  // AuditLogsService.createAuditLogs(req, res);
  logger.info("logs created successfully.");

  res.status(code).json(responseObj);
};

const sendError = async (res, req, data, msg, code) => {
  logger.error("error response send successfully.");

  sendResponse(res, req, data, msg || "Request Failed", false, code);
};

module.exports = {
  sendResponse,
  sendError,
};
