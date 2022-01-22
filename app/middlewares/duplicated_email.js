module.exports = (app) => {
  const { userModel } = app.models

  app.middlewares.checkDuplicatedEmail = (req, res, next) => {
    userModel
      .findOne({ email: req.body.email })
      .exec((err, user) => {
        if (err)
          next({message: err})
  
        if (user)
          next({
            status: 422,
            message: "Failed! Email is already in use!"
          })
        
        next()
      })
  }
}