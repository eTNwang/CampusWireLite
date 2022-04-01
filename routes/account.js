const express = require('express')

const User = require('../models/User')
const isAuthenticated = require('../middlewares/isAuthenticated')
const logError = require('../middlewares/logError')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { body } = req
  const { username, password } = body
  try {
    await User.create({ username, password })
    req.session.username = username
    req.session.password = password
    res.send(`user signup as ${req.session.username} was successful`)
  } catch (e) {
    res.send('user signup had a problem')
  }
})

router.post('/login', logError, (req, res, next) => {
  const { body } = req
  const { username, password } = body
  try {
    User.findOne({ username, password }, (err, user) => {
      try {
        if (!user) {
          res.send('wrong username or password')
        } else if (user) {
          req.session.username = username
          req.session.password = password
          res.send(`succesfully logged in as ${req.session.username}`)
        }
      } catch (e) {
        res.send('error occured')
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = 'no user'
  res.send('succesfully logged out')
})

router.post('/update', async (req, res) => {
  try {
    const { body } = req
    const { username, password } = body
    await User.updateOne({ username }, { password })

    res.send('user update was successful')
  } catch (e) {
    res.send('error occured')
  }
})

router.post('/delete', async (req, res) => {
  try {
    const { body } = req
    const { username, password } = body
    await User.deleteOne({ username, password })
    res.send(`user ${req.session.username} was successfully deleted`)
  } catch (e) {
    res.send('error occured')
  }
})

module.exports = router
