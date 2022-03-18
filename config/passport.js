let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = "wowwow"

// create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload)
  let user = getUser({ id: jwt_payload.id })

  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})

// use the strategy
passport.use(strategy)
