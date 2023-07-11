const JwtUtils = require("../utils/jwtUtils.js");
const logger = require("../utils/loggerUtils.js");
const ResponseUtils = require("../utils/responseUtils.js");

const verifyToken = async (req, res, next) => {
  if (req.headers["authorization"]) {
    let token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      logger.error("no token provided!");
      return ResponseUtils.sendError(res, {}, "Token not provided!", 403);
    }
    // const verified = await JwtUtils.verifyJWTToken(token, req, res);

    const verified = await JwtUtils.verifyUserToken(token, req, res);

    if (verified) next();
  } else {
    logger.error("no authorization header provided!");

    return ResponseUtils.sendError(res, req, {}, "Token not provided!", 403);
  }
};

const JwtAuthentication = {
  verifyToken,
};
module.exports = JwtAuthentication;
