const yup = require("yup");
const logger = require("../utils/loggerUtils");

const ResponseUtils = require("../utils/responseUtils");

const validate = async (schema, req, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });
    next();
  } catch (e) {
    const errors = e.inner.map(({ message }) => ({
      validationError: message,
    }));

    logger.error(errors);
    ResponseUtils.sendError(res, req, {}, errors, 400);
  }
};



const validationMiddleware = {

};

module.exports = validationMiddleware;
