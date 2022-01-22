const { promisify } = require('util')
const mongoose = require('mongoose')

const dbConfig = require('../config/db_config')

const mongooseConnect = promisify(mongoose.connect)

module.exports = async (app) => {
  await mongooseConnect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: dbConfig.TIMEOUT,
  })
  .catch(()=>console.log('nono'))

  app.locals.models = {
    roleModel: require('./role_model')(mongoose),
    userModel: require('./user_model')(mongoose)
  }
}