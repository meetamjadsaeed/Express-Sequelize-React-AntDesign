const ProductServices = require("../services/products.services");
const logger = require("../utils/loggerUtils");
const ResponseUtils = require("../utils/responseUtils");


const { products } = require("../entities/products.entities");


// image Upload
// const multer = require('multer')
// const path = require('path')



// 1. Create Product

const addProduct = async (req, res) => {
    logger.info("IN -  addProduct controller!");
    try {
        const { title, price, description } = req.body;

        let productData = {
            title: title,
            price: price,
            description: description,
        }

        const response = await ProductServices.addProduct(productData);
        logger.info("OUT -  addProduct controller!");

        return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
    } catch (err) {
        logger.error("Error", err.message);
        return ResponseUtils.sendError(res, req, {}, "", 500);
    }
};

// 2. get single product

const getOneProduct = async (req, res) => {

    logger.info("IN -  getOneProduct controller!");
    try {
        let id = req.params.id
        const response = await ProductServices.getOneProduct(id)
        logger.info("OUT -  getOneProduct controller!");

        return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
    } catch (err) {
        logger.error("Error", err.message);
        return ResponseUtils.sendError(res, req, {}, "", 500);
    }
}

// 3. update Product

const updateProduct = async (req, res) => {

    logger.info("IN -  updateProduct controller!");
    try {
        let id = req.params.id
        const { title, price, description } = req.body;

        let productData = {
            title: title,
            price: price,
            description: description,
        }
        const response = await ProductServices.updateProduct(productData, id)
        logger.info("OUT -  updateProduct controller!");

        return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
    } catch (err) {
        logger.error("Error", err.message);
        return ResponseUtils.sendError(res, req, {}, "", 500);
    }

}


// 4. delete product by id

const deleteProduct = async (req, res) => {

    logger.info("IN -  updateProduct controller!");
    try {
        let id = req.params.id
        const response = await ProductServices.deleteProduct(id);
        logger.info("OUT -  updateProduct controller!");

        return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
    } catch (err) {
        logger.error("Error", err.message);
        return ResponseUtils.sendError(res, req, {}, "", 500);
    }

}


// 5. get All products

const getAllProducts = async (req, res) => {
    logger.info("IN -  getAllProducts controller!");
    try {
        const response = await ProductServices.getAllProducts();
        logger.info("OUT -  getAllProducts controller!");

        // console.log(response,"Products");


        return ResponseUtils.sendResponse(res, req, response, "success", true, 200);
    } catch (err) {
        logger.error("Error", err.message);
        return ResponseUtils.sendError(res, req, {}, "", 500);
    }
};

// 8. Upload Image Controller

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: '1000000' },
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if (mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Give proper files formate to upload')
//     }
// }).single('image')

module.exports = {
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    // upload
};
