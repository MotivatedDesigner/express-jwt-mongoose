const { promisify } = require('util')
const mongoose = require('mongoose')

const mongooseConnect = promisify(mongoose.connect)

setup()
async function setup() {
  const { dbConfig } = global.app.config

  await mongooseConnect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: dbConfig.TIMEOUT,
  })
  .catch(()=>console.log('nono'))

  global.app.models = {
    roleModel: require('./role_model')(mongoose),
    userModel: require('./user_model')(mongoose)
  }
}