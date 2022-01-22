const express = require('express')
const appConfig = require('./app/config/app_config')

const app = express()

app.listen(appConfig.PORT, () => console.log('Server is Up, Port: ',appConfig.PORT))