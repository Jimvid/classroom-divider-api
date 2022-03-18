const Sequelize = require("sequelize")

// Variables
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const host = process.env.HOST

// initialze an instance of Sequelize
const sequelize = new Sequelize(dbName, username, password, {
  host: host,
  dialect: "postgres",
  pool: {
    max: 9,
    min: 0,
    idle: 10000,
  },
})

// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err))

module.exports = sequelize
