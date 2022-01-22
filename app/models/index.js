const mongoose = require('mongoose')
const dbConfig = require('../config/db_config')

const roleModel = require('./role_model')(mongoose)
const userModel = require('./user_model')(mongoose)

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: dbConfig.TIMEOUT,
  })
  .catch(()=>console.log('nono'))

module.exports = {
  roleModel,
  userModel,
}