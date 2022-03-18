const jwt = require("express-jwt")
const jwks = require("jwks-rsa")

exports.jwtCheck = () =>
  jwt({
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
