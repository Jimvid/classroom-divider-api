const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const errorHandlers = require("../handlers/errorHandlers")

// @route       POST api/v1/user
// @desc        Register user
// @access      Public
router.post("/", errorHandlers.catchErrors(userController.createUser))

// @route       GET api/v1/user
// @desc        Get all users
// @access      Public
router.get("/", errorHandlers.catchErrors(userController.getUsers))

module.exports = router
