// Set up mongoose connection
const mongoose = require('mongoose')
const mongoDB = 'mongodb://abc123!:abc123!@ds163667.mlab.com:63667/customer_api'
// const mongoDB = 'mongodb://localhost:27017/playermanager'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise

module.exports = mongoose
