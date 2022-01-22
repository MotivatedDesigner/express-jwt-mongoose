const 
module.exports = (app) => {
  app.middlewares.checkRoleExist = (req, res, next) => {
    if (req.body.role) {
        if (!roleModel.includes(req.body.role)) {
          res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
          return;
        }
    }
    next();
  }
}
/* 
function checkRoleExist
  roleModel
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
} */