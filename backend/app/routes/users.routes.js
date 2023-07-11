const express = require("express");
const router = express.Router();
const UserContollers = require("../controllers/users.controller");

router.post("/addUser", UserContollers.addUser);

module.exports = router;
