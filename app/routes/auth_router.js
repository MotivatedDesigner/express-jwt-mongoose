
const { checkDuplicateEmail } = app.middlewares

const { authController } = app.controllers

app.post("/api/auth/signup", [checkDuplicateEmail], authController.signup)

// app.post("/api/auth/signin", controller.signin)

// app.get("/api/auth/signout", controller.signout)

// app.get("/api/auth/refreshtoken", controller.refreshToken)