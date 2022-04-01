const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')
const Question = require('../models/questions')

const router = express.Router()

router.get('/questions', async (req, res) => {
  try {
    const all = await Question.find({})
    res.send(all)
  } catch {
    res.send('an error occurred')
  }
})

router.post('/questions/add', isAuthenticated, async (req, res) => {
  const { body } = req
  const { questionText } = body
  await Question.create({ questionText, answer: '', author: req.session.username })
  res.send(`${questionText} was added by ${req.session.username}:`)
})

router.post('/questions/answer', isAuthenticated, async (req, res) => {
  const { body } = req
  const { _id, answer } = body
  try {
    await Question.updateOne({ _id }, { $set: { answer } })
    res.send('question updated')
  } catch (e) {
    res.send('an error occurred')
  }
})

module.exports = router
