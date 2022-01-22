const express = require('express')

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

// Controllers
require('./app/controllers')

// Routes
require('./app/routes')
app.post('/api/auth/signup',(req,res)=>{
  res.sendStatus(200)
})

app.listen(app.appConfig.PORT, () => console.log('Server is Up'))