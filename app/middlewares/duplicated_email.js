const { userModel } = app.models

app.middlewares.checkDuplicateEmail = (req, res, next) => {
  userModel
    .findOne({ email: req.body.email })
    .exec((err, user) => {
      if (err)
        return next({message: err})

      if (user)
        return next({
          status: 422,
          message: "Failed! Email is already in use!"
        })
      
      next()
    })
}