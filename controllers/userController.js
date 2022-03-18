const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// Create user
exports.createUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body

  // await User.sync({ force: true })

  // Check if user exists
  let user = await User.findOne({
    where: { email },
  })

  if (user) {
    res.status(400).json({ msg: "User already exists" })
    return
  }

  user = new User({
    firstName,
    lastName,
    email,
    password,
  }).dataValues

  // Hash password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)

  // Create user
  const createdUser = await User.create(user)

  const payload = {
    user: {
      id: createdUser.id,
    },
  }

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 3600000 },
    (err, token) => {
      if (err) throw err
      res.status(200).json({ token })
    }
  )
}

// Get all users
exports.getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["password"],
    },
  })
  res.json(users)
}
