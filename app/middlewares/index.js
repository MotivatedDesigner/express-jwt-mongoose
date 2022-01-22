const cookieParser = require('./cookie_parser')

module.exports = (app) => {
  app.use(cookieParser)
}