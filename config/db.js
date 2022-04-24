const Sequelize = require("sequelize")

// Variables
// const username = process.env.DB_USERNAME
// const password = process.env.DB_PASSWORD
// const dbName = process.env.DB_NAME
// const host = process.env.HOST
const dialectOptions = process.env.NODE_ENV === "production" && {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
}

// initialze an instance of Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions,
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
