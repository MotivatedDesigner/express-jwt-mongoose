const express = require('express')
const appConfig = require('./app/config/app_config')
const authConfig = require('./app/config/auth_config')
const mongoose = require('mongoose')

// App Setup
const app = express()
app.disable('x-powered-by')

// Middlewares
app.use(express.json())
require('./app/middlewares')(app)

// Database Setup
require('./app/models')
app.get('/cookie', (req, res) => {
  res.cookie('token3', 'lala', {
    maxAge: authConfig.ACCESS_TOKEN_EXPIRATION * 10000,
    secure: appConfig.NODE_ENV == "development" ? false : true,
    httpOnly: true,
    sameSite: 'lax'
  })
  res.sendStatus(200)
})
app.get('/', (req, res) => {
  res.send({cookies: req.headers.cookie})
})
app.listen(
  appConfig.PORT, 
  () => console.log(`Server is Up, Port: ${appConfig.PORT}`)
)