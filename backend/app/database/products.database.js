const { products } = require("../entities/products.entities");
const logger = require("../utils/loggerUtils");

const addProduct = async (productData) => {
    logger.info("IN -  addProduct Database query!");
    try {
        let response = await products.create(productData);
        logger.info("OUT -  addProduct Database query!");
        return response;
    } catch (err) {
        logger.error("error in addProduct Database query", err.message);
        throw new Error("error in addProduct Database query", err.message);
    }
};

const getOneProduct = async (id) => {
    logger.info("IN -  getOneProduct Database query!");
    try {
        let response = await products.findOne({ where: { id: id } });
        logger.info("OUT -  getOneProduct Database query!");
        return response;
    } catch (err) {
        logger.error("error in getOneProduct Database query", err.message);
        throw new Error("error in getOneProduct Database query", err.message);
    }
};



const updateProduct = async (productData, id) => {
    logger.info("IN -  updateProduct Database query!");
    try {
        let response = await products.update(productData, { where: { id: id } });
        logger.info("OUT -  updateProduct Database query!");
        return response;
    } catch (err) {
        logger.error("error in updateProduct Database query", err.message);
        throw new Error("error in updateProduct Database query", err.message);
    }
};

const deleteProduct = async (id) => {
    logger.info("IN -  deleteProduct Database query!");
    try {
        let response = await products.destroy({ where: { id: id } });
        logger.info("OUT -  deleteProduct Database query!");
        return response;
    } catch (err) {
        logger.error("error in deleteProduct Database query", err.message);
        throw new Error("error in deleteProduct Database query", err.message);
    }
};



const getAllProducts = async () => {
    logger.info("IN -  getAllProducts Database query!");
    try {
        let response = await products.findAll({})
        logger.info("OUT -  getAllProducts Database query!");
        // console.log(response,"Products");
        return response;
    } catch (err) {
        logger.error("error in getAllProducts Database query", err.message);
        throw new Error("error in getAllProducts Database query", err.message);
    }
};

module.exports = {
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
};
