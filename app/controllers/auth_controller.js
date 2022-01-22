const bcrypt = require("bcrypt")

const { userModel, roleModel } = app.models

app.controllers.authController = {
  signup
}

function signup(req, res) {
  const user = new userModel({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err)
      next({ message: err })
    res.send({ message: "User was registered successfully!" })

    // if (req.body.role) {
    //   roleModel.find({name: req.body.role}, (err, role) => {
    //     if (err)
    //       next({ message: err })

    //     user.role = role._id
    //     user.save((err) => {
    //       if (err)
    //         next({ message: err })

    //       res.send({ message: "User was registered successfully!" });
    //     })
    //   })
    // } else {
    //   Role.findOne({ name: "user" }, (err, role) => {

    //     if (err)
    //       next({ message: err })

    //     user.role = role._id
    //     user.save((err) => {
    //       if (err)
    //         next({ message: err })

    //       res.send({ message: "User was registered successfully!" });
    //     })

    //   })
    // }
    
  })
}