const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const cookieSession = require('cookie-session')
const e = require('express')
const AccountRouter = require('./routes/account')
const APIRouter = require('./routes/api')
const logError = require('./middlewares/logError')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

app.use(express.json())

app.use(express.static('dist')) // set the static folder

app.use((err, req, res, next) => {
  next(err)
  res.status(500).send('Something broke!')
})

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['spooky'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/account', AccountRouter)
app.use('/api', APIRouter)

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

app.listen(3000, () => {
  console.log('listening on 3000')
  console.log('mongoDB is connected')
})

// const express = require('express')
// const cookieSession = require('cookie-session')

// const searchRouter = require('./searchRouter')
// const projectRouter = require('./projectRouter')
// const loginRouter = require('./loginRouter')

// const app = express()
// const port = process.env.PORT || 3000

// // verify(usernmae, password)

// // app.use((req, res, next) => {
// //   // username, password are fecthed from the req
// //   if (verify(username, password)) {
// //     next()
// //   } else {
// //     next(new Error('invalid user credentials'))
// //   }
// // })

// // middleware 2
// // app.use(...)

// app.use(express.json())
// app.use(cookieSession({
//   name: 'session',
//   keys: ['pineapple'],
//   // Cookie Options
//   // maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   maxAge: 10 * 1000
// }))

// app.get('/api', (req, res) => {
//   return res.send('hello world!')
// })

// app.use('/search', searchRouter)
// app.use('/project', projectRouter)
// app.use('/login', loginRouter)

// // REQ.BODY is only available within a POST request
// app.post('/credentials', (req, res) => {
//   const { username, password } = req.body

//   res.send(`username: ${username}, password: ${password}`)
//   // res.json(variable)
// })

// app.get('/redirect', (req, res) => {
//   res.redirect('https://www.seas.upenn.edu/~cis197')
// })

// // error handling
// app.use((err, req, res) => {
//   res.send('an error has occured')
// })

// // Start listening for requests
// app.listen(port, () => {
//   console.log('Listening on port ' + port)
// })
