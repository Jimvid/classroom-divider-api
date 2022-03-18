const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [0, 50],
        msg: "Provide valid first name",
      },
      notEmpty: {
        msg: "You must provide your first name",
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
        msg: "You must provide your last name",
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Provide a valid email",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: "Password cannot be blank",
      },
    },
  },
})

module.exports = User
