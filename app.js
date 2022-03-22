const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes")
const errorHandlers = require("./handlers/errorHandlers")

const jwt = require("express-jwt")
const jwks = require("jwks-rsa")
// Create express app
const app = express()

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json())

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Verify JWT
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-2x1iyt13.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://www.my-classroom-api.com",
  issuer: "https://dev-2x1iyt13.eu.auth0.com/",
  algorithms: ["RS256"],
})

app.use(jwtCheck)

// Routes
app.use("/api/v1", routes)

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound)

// If this was a really bad error we didn't expect! Shoot eh
if (app.get("env") === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors)
}

// production error handler
app.use(errorHandlers.productionErrors)

module.exports = app
