const Student = require("../models/Student")

// Get single
exports.getOne = async (req, res) => {
  const id = req.params.id

  const student = await Student.findOne({
    where: { id },
  })

  if (student) {
    res.status(200).json(student)
  } else {
    res.status(404).send("Could not find student")
  }
}

// Create
exports.create = async (req, res, next) => {
  const { firstName, lastName, classroomId } = req.body

  // Check if student exists
  const student = await Student.findOne({
    where: { firstName, lastName },
  })

  if (student) {
    res.status(400).json({ msg: "A student with that name already exists." })
    return
  }

  const newStudent = await Student.create({
    firstName,
    lastName,
    classroomId,
  })

  res.status(200).json(newStudent)
}

// Update
exports.update = async (req, res) => {
  const { firstName, lastName } = req.body
  const id = req.params.id

  const student = await Student.findOne({
    where: { id },
  })

  if (student) {
    await student.update({ ...student, firstName, lastName })
    res.send(`Updated student ${student.firstName}, ${student.lastName}.`)
  } else {
    res.send(`Could not update student.`)
  }
}

// Delete
exports.delete = async (req, res) => {
  const id = req.params.id

  const student = await Student.findOne({
    where: { id },
  })

  if (student) {
    await student.destroy()
    res.send(`${student.firstName} ${student.lastName} was deleted.`)
  } else {
    res.send(`Could not delete student as it does not exist.`)
  }
}
