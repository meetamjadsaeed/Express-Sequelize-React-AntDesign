const UsersDBQurey = require("../database/users.database");
const logger = require("../utils/loggerUtils");

const addUser = async (userData) => {
  logger.info("IN -  addUser service!");
  try {
    const response = await UsersDBQurey.addUser(userData);
    logger.info("OUT -  addUser service!");
    return response;
  } catch (err) {
    logger.error("error in addUser service: ", err.message);
    throw new Error("err in addUser service: ", err.message);
  }
};

const getAllUsers = async () => {
  logger.info("IN -  getAllUsers service!");
  try {
    const response = await UsersDBQurey.getAllUsers();
    logger.info("OUT -  getAllUsers service!");
    return response;
  } catch (err) {
    logger.error("error in getAllUsers service: ", err.message);
    throw new Error("err in getAllUsers service: ", err.message);
  }
};

module.exports = {
  addUser,
  getAllUsers,
};
