
module.exports = (app) => {
  app.post(
    "/api/auth/signup",
    [
      app.locals.checkDuplicateEmail,
      app.locals.checkRolesExisted
    ],
    controller.signup
  )
  
  app.post("/api/auth/signin", controller.signin)
  
  app.get("/api/auth/signout", controller.signout)

  app.get("/api/auth/refreshtoken", controller.refreshToken)
}