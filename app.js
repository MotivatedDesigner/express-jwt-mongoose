const express = require('express')
const appConfig = require('./app/config/app_config')

// App Setup
const app = express()
app.disable('x-powered-by')
global.app = app

// App Config
require('./app/config')

// Database Setup
require('./app/models')

// Middlewares
app.use(express.json())
require('./app/middlewares')

app.listen(
  appConfig.PORT, 
  () => console.log(`Server is Up, Port: ${appConfig.PORT}`)
)