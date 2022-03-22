// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" })

// Port
const port = process.env.PORT || 3001

// Start app
const app = require("./app")

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
