
module.exports = (app) => {
  const { checkDuplicateEmail, checkRoleExist } = app.middlewares
  
  app.post("/api/auth/signup", [checkDuplicateEmail, checkRoleExist], controller.signup)
  
  app.post("/api/auth/signin", controller.signin)
  
  app.get("/api/auth/signout", controller.signout)
  
  app.get("/api/auth/refreshtoken", controller.refreshToken)
}