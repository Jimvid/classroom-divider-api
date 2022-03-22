const express = require("express")
const router = express.Router()
const studentController = require("../controllers/studentController")
const errorHandlers = require("../handlers/errorHandlers")

// @route       GET api/v1/student
// @desc        Get single student
// @access      Public
router.get("/:id", errorHandlers.catchErrors(studentController.getOne))

// @route       POST api/v1/student
// @desc        Create student
// @access      Public
router.post("/", errorHandlers.catchErrors(studentController.create))

// @route       DELETE api/v1/student
// @desc        Delete student
// @access      Public
router.delete("/:id", errorHandlers.catchErrors(studentController.delete))

// @route       PUT api/v1/student
// @desc        Update student
// @access      Public
router.put("/:id", errorHandlers.catchErrors(studentController.update))

module.exports = router
