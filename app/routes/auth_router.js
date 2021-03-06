
const { checkDuplicateEmail } = app.middlewares

const { authController } = app.controllers

app.post("/api/auth/signup", [checkDuplicateEmail], authController.signup)

app.post("/api/auth/signin", authController.signin)

app.get("/api/auth/signout", authController.signout)

app.get("/api/auth/refreshtoken", authController.refreshToken)
