const AuthenticationServices = require("../services/authentication.service");
const logger = require("../utils/loggerUtils");
const ResponseUtils = require("../utils/responseUtils");

const userAuthentication = async (req, res) => {
  logger.info("IN -  userAuthentication controller!");
  try {
    const { userName, password, mobileNumber } = req.body;

    const token = await AuthenticationServices.userAuthentication(
      userName,
      password,
      mobileNumber
    );

    logger.info("token send succesfully");
    // console.log(userName, password, mobileNumber,"credentials");
    console.log(token, "token");

    req.user = {
      userName,
      mobileNumber,
    };
    return ResponseUtils.sendResponse(res, req, token, "success", true, 200);
  } catch (err) {
    logger.error("Error", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

module.exports = {
  userAuthentication,
};
