
app.middlewares.checkRoleExist = (req, res, next) => {
  const { ROLES } = app.authConfig

  if (req.body.role && !ROLES.includes(req.body.role))
    next({
      status: 422,
      message: `Failed! Role ${req.body.role} does not exist!`
    })

  next()
}