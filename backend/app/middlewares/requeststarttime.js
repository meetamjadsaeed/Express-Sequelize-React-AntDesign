const commonUtils = require("../utils/commonUtils");

setReqDate = (req, res, next) => {
  req.date = commonUtils.getDate();
  next();
};

const auditDateSetter = {
  setReqDate: setReqDate,
};

module.exports = auditDateSetter;
