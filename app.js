const express = require('express')
const appConfig = require('./app/config/app_config')

// App Setup
const app = express()
app.disable('x-powered-by')

// Database Setup
require('./app/models')(app)

// Middlewares
app.use(express.json())
require('./app/middlewares')(app)

app.listen(
  appConfig.PORT, 
  () => console.log(`Server is Up, Port: ${appConfig.PORT}`)
)