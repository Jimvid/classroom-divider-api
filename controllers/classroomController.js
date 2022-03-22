const Classroom = require("../models/Classroom")
const Student = require("../models/Student")

// Create user
exports.create = async (req, res, next) => {
  const { name, userId } = req.body

  // await Classroom.sync({ force: true })

  let classroom = await Classroom.findOne({ where: { name } })

  if (classroom) {
    res.status(400).json({ msg: "Classroom already exists" })
    return
  }

  classroom = new Classroom({
    name,
    userId,
  }).dataValues

  classroom = await Classroom.create(classroom)

  res.status(200).json(classroom)
}

// Update
exports.update = async (req, res) => {
  const { name } = req.body
  const id = req.params.id

  const classroom = await Classroom.findOne({
    where: { id },
  })

  if (classroom) {
    await classroom.update({ ...classroom, name })
    res.send(`Updated classroom ${classroom.name}.`)
  } else {
    res.send(`Could not update classroom.`)
  }
}

// Delete
exports.delete = async (req, res) => {
  const id = req.params.id

  const classroom = await Classroom.findOne({
    where: { id },
  })

  if (classroom) {
    await classroom.destroy()
    res.send(`Classroom ${classroom.name} was deleted.`)
  } else {
    res.send(`Could not delete classroom as it does not exist.`)
  }
}

// Get all classrooms for a user
exports.getAllByUser = async (req, res) => {
  const classrooms = await Classroom.findAll({
    where: {
      userId: req.body.userId,
    },
  })
  res.json(classrooms)
}

// Get all students in a classroom
exports.getOne = async (req, res) => {
  const id = req.params.id

  const _classroom = await Classroom.findOne({
    where: { id },
  })

  if (!_classroom) {
    res.status(404).send("Could not find classroom.")
    return
  }

  const students = await Student.findAll({
    where: {
      classroomId: id,
    },
  })

  const classroom = {
    id: _classroom.id,
    name: _classroom.name,
    userId: _classroom.userId,
    createdAt: _classroom.createdAt,
    updatedAt: _classroom.updatedAt,
    students,
  }

  res.status(200).json(classroom)
}
