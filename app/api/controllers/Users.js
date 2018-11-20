const userModel = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  create: (req, res, next) => {
    console.log('YOUR REQUEST OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOREQ' + req.body.name + 'REQOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOEND')
    userModel.create({
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: req.body.password
    }, (err, result) => {
      if (err) {
        next(err)
      } else {
        res.json({
          status: '201',
          message: 'User added successfully!',
          data: result
        })
      }
    })
  },
  authenticate: (req, res, next) => {
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
      if (err) {
        next(err)
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), {
            expiresIn: '1h'
          })
          res.json({ status: '201', message: 'User found', data: { user: userInfo, token: token } })
        } else {
          res.json({ status: 'error', message: 'Authentication error', data: null })
        }
      }
    })
  }
}
