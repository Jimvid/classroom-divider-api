const express = require("express")
const router = express.Router()
const classroomController = require("../controllers/classroomController")
const errorHandlers = require("../handlers/errorHandlers")

// @route       POST api/v1/classrooms
// @desc        Register user
router.post("/", errorHandlers.catchErrors(classroomController.create))

// @route       GET api/v1/classrooms
// @desc        Get all classrooms by yser
router.get("/", errorHandlers.catchErrors(classroomController.getAllByUser))

// @route       DELETE api/v1/classrooms/:id
// @desc        Delete classroom
router.delete("/:id", errorHandlers.catchErrors(classroomController.delete))

// @route       PUT api/v1/classrooms
// @desc        Update classroom
router.put("/:id", errorHandlers.catchErrors(classroomController.update))

// @route       GET api/v1/classrooms/:id
// @desc        Get single classroom and it's students
router.get("/:id", errorHandlers.catchErrors(classroomController.getOne))

module.exports = router
