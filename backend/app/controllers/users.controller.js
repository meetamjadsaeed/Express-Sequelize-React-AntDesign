const UserServices = require("../services/users.services");
const logger = require("../utils/loggerUtils");
const ResponseUtils = require("../utils/responseUtils");

const addUser = async (req, res) => {
  logger.info("IN -  addUser controller!");
  try {

    const { username, mobileNumber, email, password } = req.body;

    let userData = {
      username,
      mobileNumber,
      email,
      password,

    }
    const response = await UserServices.addUser(userData);
    logger.info("OUT -  addUser controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    logger.error("Error", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};

const getAllUsers = async (req, res) => {
  logger.info("IN -  getAllUsers controller!");
  try {
    const response = await UserServices.getAllUsers();
    logger.info("OUT -  getAllUsers controller!");

    return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
  } catch (err) {
    logger.error("Error", err.message);
    return ResponseUtils.sendError(res, req, {}, "", 500);
  }
};







module.exports = {
  addUser,
  getAllUsers,
};
