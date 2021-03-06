const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const { userModel, roleModel, refreshTokenModel } = app.models

app.controllers.authController = {
  signup,
  signin,
  signout,
  refreshToken
}

function signup(req, res, next) {
  const user = new userModel({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })

  user.save((err, user) => {
    if (err)
      return next({ message: err })
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

async function signin(req, res, next) {
  userModel
    .findOne({ email: req.body.email })
    // .populate("role", "-__v")
    .exec(async (err, user) => {
      if (err)
        return next({ message: err })

      if (!user)
        return next({ status: 404, message: "User Not found." });

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid)
        return next({
          status: 401,
          message: "Invalid Password!",
        })

      const accessToken = jwt.sign({ id: user.id }, app.authConfig.SECRET, {
        expiresIn: app.authConfig.ACCESS_TOKEN_EXPIRATION
      })
      res.cookie('access', accessToken, {
        maxAge: app.authConfig.ACCESS_TOKEN_EXPIRATION * 1000,
        secure: app.appConfig.NODE_ENV == 'development' ? false : true,
        httpOnly: true,
        sameSite: 'lax'
      })

      const refreshDb = await refreshTokenModel.create({  user: user._id })
      const refreshToken = jwt.sign({ id: refreshDb._id }, app.authConfig.SECRET)
      res.cookie('refresh', refreshToken, {
        secure: app.appConfig.NODE_ENV == 'development' ? false : true,
        httpOnly: true,
        sameSite: 'lax'
      })

      res.status(200).send({
        id: user._id,
        email: user.email,
        role: user.role,
      })
    })
}

async function signout(req, res, next) {
  const reqToken = req.cookies?.refresh

  if (!reqToken)
    return next({status: 403, message: "Refresh Token is required!" })
    
  try {
    reqToken = jwt.verify(reqToken, app.authConfig.SECRET)
    await refreshTokenModel.findByIdAndRemove(reqToken.id, { useFindAndModify: false }).exec()
    res.clearCookie('refresh')
    res.clearCookie('access')
    res.status(200).send()
  } catch (err) {
    return next({ message: err })
  }
}

async function refreshToken(req, res, next) {
  console.log(req.cookies)
  const reqToken = req.cookies?.refresh

  if (!reqToken)
    return next({status: 403, message: "Refresh Token is required!" })

  try {
    reqToken = jwt.verify(reqToken, app.authConfig.SECRET)
    const dbToken = await refreshTokenModel.findById(reqToken.id)

    if (!dbToken)
      return next({status: 403, message: "Refresh token is not in database!" })

    if (!dbToken.isValid) {
      refreshTokenModel.findByIdAndRemove(dbToken._id, { useFindAndModify: false }).exec()
      
      return next({
        status: 403,
        message: "Refresh token was expired. Please make a new signin request",
      })
    }

    const accessToken = jwt.sign(
      { id: dbToken.user._id }, 
      app.authConfig.SECRET, {
        expiresIn: app.authConfig.ACCESS_TOKEN_EXPIRATION,
      }
    )
    res.cookie('access', accessToken, {
      maxAge: app.authConfig.ACCESS_TOKEN_EXPIRATION * 1000,
      secure: app.appConfig.NODE_ENV == 'development' ? false : true,
      httpOnly: true,
      sameSite: 'lax'
    })

    res.status(200).send()
  } catch (err) {
    return next({ message: err })
  }
}