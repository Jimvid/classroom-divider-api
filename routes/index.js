const express = require("express")
const router = express.Router()

// Classrooms
router.use("/classrooms", require("./classrooms"))

// Students
router.use("/students", require("./students"))

module.exports = router
