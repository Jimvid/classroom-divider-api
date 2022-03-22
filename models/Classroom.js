const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Classroom = sequelize.define("Classroom", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 50],
        msg: "Provide valid name",
      },
      notEmpty: {
        msg: "You must provide a classroom name",
      },
    },
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "User ID is required",
      },
    },
  },
})

module.exports = Classroom
