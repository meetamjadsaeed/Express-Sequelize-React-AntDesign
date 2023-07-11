const { users } = require("../entities/users.entities");
const logger = require("../utils/loggerUtils");

const userAuthentication = async (userName, password, mobileNumber) => {
  logger.info("IN -  userAuthentication Database query!");
  try {
    let userExist = await users.findOne({
      where: { username: userName, mobile_number: mobileNumber },
      attributes: ["id", "username", "password"],
    });
    logger.info("OUT -  userAuthentication Database query!");
    if (userExist) return userExist;

    return false;
  } catch (err) {
    logger.error("error in userAuthentication Database query", err.message);
    throw new Error("error in userAuthentication Database query", err.message);
  }
};



const updateRememberToken = async (userId, rememberToken) => {
  logger.info("IN -  updateRememberToken Database query!");
  try {
    await users.update(
      { remember_token: rememberToken },
      { where: { id: userId } }
    );
  } catch (err) {
    logger.error("error in updateRememberToken Database query", err.message);
    throw new Error("error in updateRememberToken Database query", err.message);
  }

}


module.exports = { userAuthentication, updateRememberToken };
