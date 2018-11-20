const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const players = require('./routes/players')
const users = require('./routes/users')
const mongoose = require('./config/database') // DB Config
var jwt = require('jsonwebtoken')
const app = express()

app.set('secretKey', 'nodeRestApi') // jwt secret token

// Connect to mongoDB
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.use(logger('combined'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

var allowCrossDomain = function (req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Content-Type, Authorization, Content-Length, X-Requested-With, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, x-access-token')
  next()
}
app.use(allowCrossDomain)

app.get('/', (req, res) => {
  res.json({ 'Response': 'Get Request' })
})

// Public Route
app.use('/users', users)

// Private Route
app.use('/players', validateUser, players)

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204)
})

function validateUser (req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), (err, decoded) => {
    if (err) {
      res.json({ status: 'error', message: err.message, data: null })
    } else {
      // Add user id to request
      req.body.userId = decoded.id
      next()
    }
  })
}

// handle 404
app.use((req, res, next) => {
  let err = new Error('Not Found')
  next(err)
})

// handle errors
app.use((err, req, res, next) => {
  console.log(err)
  if (err.status === 404) {
    res.status(404).json({ message: 'Not Found' })
  } else {
    // UNDEFINED ERROR
    res.status(500).json({ message: 'Something went wrong...' })
  }
})

app.listen(3000, () => {
  console.log(`Server started on port 3000`)
})
