const cookieParser = require('./cookie_parser')

module.exports = (app) => {
  app.middlewares = {}

  app.use(cookieParser)
  
  require('./duplicated_email')(app)
}