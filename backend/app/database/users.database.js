const { users } = require("../entities/users.entities");
const logger = require("../utils/loggerUtils");

const addUser = async (userData) => {
  logger.info("IN -  addUser Database query!");
  try {
    let response = await users.create(userData);
    logger.info("OUT -  addUser Database query!");
    return response;
  } catch (err) {
    logger.error("error in addUser Database query", err.message);
    throw new Error("error in addUser Database query", err.message);
  }
};

const getAllUsers = async () => {
  logger.info("IN -  getAllUsers Database query!");
  try {
    let response = await users.findAll();
    logger.info("OUT -  getAllUsers Database query!");
    return response;
  } catch (err) {
    logger.error("error in getAllUsers Database query", err.message);
    throw new Error("error in getAllUsers Database query", err.message);
  }
};




module.exports = {
  addUser,
  getAllUsers,
};
