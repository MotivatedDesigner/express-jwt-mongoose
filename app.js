const express = require('express')
const appConfig = require('./app/config/app_config')
const dbConfig = require('./app/config/db_config')
const mongoose = require('mongoose')

const app = express()
app.disable('x-powered-by')

require('./app/models')

app.use((err, req, res) => {
  console.log(err)
})

app.listen(
  appConfig.PORT, 
  () => console.log(`Server is Up, Port: ${appConfig.PORT}`)
)