const express = require("express");
const router = express.Router();
const ProductControllers = require("../controllers/products.controller");

const isLogin = require("../middlewares/authentication");



router.post("/addProduct", isLogin.verifyToken, ProductControllers.addProduct);
router.get('/:id', ProductControllers.getOneProduct)
router.get("", ProductControllers.getAllProducts);
router.put('/:id', isLogin.verifyToken, ProductControllers.updateProduct)
router.delete('/:id', isLogin.verifyToken, ProductControllers.deleteProduct)


module.exports = router;
