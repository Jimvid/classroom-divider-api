const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")
const Student = require("./Student")

const Classroom = sequelize.define("classroom", {
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

Classroom.hasMany(Student, { as: "students" })
Student.belongsTo(Classroom, { foreignKey: "classroomId", as: "classroom" })

module.exports = Classroom
