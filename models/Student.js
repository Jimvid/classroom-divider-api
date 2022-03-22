const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Student = sequelize.define("Student", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 50],
        msg: "Provide valid first name",
      },
      notEmpty: {
        msg: "You must provide a first name",
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 50],
        msg: "Provide valid last name",
      },
      notEmpty: {
        msg: "You must provide a last name",
      },
    },
  },
  classroomId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "classroom ID is required",
      },
    },
  },
})

module.exports = Student
