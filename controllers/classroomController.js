const Classroom = require("../models/Classroom")
const Student = require("../models/Student")

// Create classroom
exports.create = async (req, res, next) => {
  console.log("whoho I got hit :( ")
  const { name } = req.body
  const userId = req.user.sub

  let classroom = await Classroom.findOne({ where: { name, userId } })

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
    include: ["students"],
  })

  if (classroom) {
    await classroom.destroy()
    res.status(200).json(classroom)
  } else {
    res.send(`Could not delete classroom as it does not exist.`)
  }
}

// Get all classrooms for a user
exports.getAllByUser = async (req, res) => {
  const userId = req.user.sub

  // await Classroom.findByPk(1, { include: ["students"] })
  const classrooms = await Classroom.findAll({
    where: { userId },
    include: ["students"],
  })
  if (classrooms) {
    res.json(classrooms)
  } else {
    res.send(`Could not find any classrooms`)
  }
}

// Get one classroom
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
