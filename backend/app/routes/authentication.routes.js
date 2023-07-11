const express = require("express");
const router = express.Router();
const AuthenticationController = require("../controllers/authentication.controller");

router.post("/authentication", AuthenticationController.userAuthentication);

module.exports = router;
