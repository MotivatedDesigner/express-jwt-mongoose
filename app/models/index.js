const mongoose = require('mongoose')
const dbConfig = require('../config/db_config')

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: dbConfig.TIMEOUT,
  })
  .catch(()=>console.log('nono'))