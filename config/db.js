const Sequelize = require("sequelize")

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

sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((err) => console.error("Unable to connect to the database:", err))

module.exports = sequelize
