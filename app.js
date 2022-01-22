const express = require('express')
const appConfig = require('./app/config/app_config')
const dbConfig = require('./app/config/db_config')
const mongoose = require('mongoose')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

require('./app/models')

app.listen(
  appConfig.PORT, 
  () => console.log(`Server is Up, Port: ${appConfig.PORT}`)
)