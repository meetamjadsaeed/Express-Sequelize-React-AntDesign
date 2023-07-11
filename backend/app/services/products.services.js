const ProductsDBQurey = require("../database/products.database");
const logger = require("../utils/loggerUtils");

const addProduct = async (productData) => {
    logger.info("IN -  addProduct service!");
    try {
        const response = await ProductsDBQurey.addProduct(productData);
        logger.info("OUT -  addProduct service!");
        return response;
    } catch (err) {
        logger.error("error in addProduct service: ", err.message);
        throw new Error("err in addProduct service: ", err.message);
    }
};


const getOneProduct = async (id) => {

    logger.info("IN -  getOneProduct controller!");
    try {
        const response = await ProductsDBQurey.getOneProduct(id);
        logger.info("OUT -  getOneProduct controller!");

        return response;
    } catch (err) {
        logger.error("Error", err.message);
        return ResponseUtils.sendError(res, req, {}, "", 500);
    }
}

const updateProduct = async (productData, id) => {

    logger.info("IN -  updateProduct controller!");
    try {
        const response = await ProductsDBQurey.updateProduct(productData, id);
        logger.info("OUT -  updateProduct controller!");

        return response;
    } catch (err) {
        logger.error("Error", err.message);
        return sendError(res, req, {}, "", 500);
    }
}

const deleteProduct = async (id) => {

    logger.info("IN -  deleteProduct controller!");
    try {
        const response = await ProductsDBQurey.deleteProduct(id);
        logger.info("OUT -  deleteProduct controller!");

        return response;
    } catch (err) {
        logger.error("Error", err.message);
        return ResponseUtils.sendError(res, req, {}, "", 500);
    }
}



const getAllProducts = async () => {
    logger.info("IN -  getAllProducts service!");
    try {
        const response = await ProductsDBQurey.getAllProducts();
        logger.info("OUT -  getAllProducts service!");
        // console.log(response,"Products");
        return response;
    } catch (err) {
        logger.error("error in getAllProducts service: ", err.message);
        throw new Error("err in getAllProducts service: ", err.message);
    }
};

module.exports = {
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
};
