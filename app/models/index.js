const mongoose = require('mongoose')

setup()

async function setup() {
  const { dbConfig } = app
  mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: dbConfig.TIMEOUT,
  })
  .catch(()=>console.log('nono'))

  app.models = {
    roleModel: require('./role_model')(mongoose),
    userModel: require('./user_model')(mongoose),
    refreshTokenModel: require('./refreshToken_model')(mongoose),
  }
}