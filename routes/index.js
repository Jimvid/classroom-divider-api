const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const errorHandlers = require("../handlers/errorHandlers")

// Auth
router.use("/users", require("./user"))

router.use("/", (req, res) => {
  res.status(200).json({
    hi: "there",
    cat: "dog",
  })
})

module.exports = router
