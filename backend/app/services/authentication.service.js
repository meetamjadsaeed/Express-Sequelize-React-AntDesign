const AuthenticationDBQuery = require("../database/authentication.database");
const JwtUtils = require("../utils/jwtUtils");
const logger = require("../utils/loggerUtils");
const CommonUtils = require("../utils/commonUtils");
const jwt = require('jsonwebtoken');


const userAuthentication = async (userName, password, mobileNumber) => {
  logger.info("IN -  userAuthentication service!");
  try {
    const user = { userName, mobileNumber };
    const isAuthenticatedUser = await AuthenticationDBQuery.userAuthentication(
      userName,
      password,
      mobileNumber
    );
    const authenticatedPassword = CommonUtils.bcryptEncryptionComparision(
      isAuthenticatedUser.password,
      password
    );
    if (isAuthenticatedUser) {
      const token = JwtUtils.signJWTToken(user);
      logger.info("OUT -  userAuthentication service!");

      // console.log(isAuthenticatedUser.id,"isAuthenticatedUser")

      // Update the remember_token column in the user's record
      await AuthenticationDBQuery.updateRememberToken(
        isAuthenticatedUser.id, // Assuming the user record has an "id" field
        token.token
      );
      return {
        token: token.token,
        expiresIn: '1h',
        userData: isAuthenticatedUser,
      };
    }
  } catch (err) {
    logger.error("error in userAuthentication service", err.message);
    throw new Error("err in userAuthentication service", err.message);
  }
};



module.exports = {
  userAuthentication,
};
