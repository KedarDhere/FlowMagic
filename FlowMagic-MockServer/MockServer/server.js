const express = require('express')
const port = process.env.port || 8000
const app = express()
const checkLoggedIn = require('./auth')
const cors = require('cors')
const { applicationsData, nodesInfo } = require('./data.json')
const { applicationScreenFlow } = require('./data.json')

const fs = require('fs')
const path = require('path')

let dataFilePath = path.join(__dirname, 'data.json')
let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))

if (process.env.NODE_ENV === 'test') {
  dataFilePath = path.join(__dirname, '/__tests__/testData.json')
  data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
}

const { Mutex } = require('async-mutex')
const mutex = new Mutex()

const passport = require('passport')

const { Strategy } = require('passport-google-oauth20')
require('dotenv').config()
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

app.use(function (req, res, next) {
  console.log('Request Received')
  console.log('Method: ', req.method)
  console.log('URL: ', req.url)
  console.log('Body:', req.body)
  next()
})

app.use(express.json())

if (process.env.NODE_ENV === 'test') {
  console.log('Function called')
  app.use((req, res, next) => {
    if (req.headers['test-auth'] === 'mock-user') {
      req.user = { id: 'mockUserId' } // Mock user object for testing
    }
    next()
  })
}

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2
}

const AUTH_OPTIONS = {
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}

const verifyCallback = function (accessToken, refreshToken, profile, done) {
  console.log('Google profile', profile)
  done(null, profile)
}

// Save the session to the cookie
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  done(null, id)
})

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

app.use(cookieSession({
  name: 'flowMagic',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [config.COOKIE_KEY_1]
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth', passport.authenticate('google', {
  scope: ['email']
}))

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: process.env.CLIENT_URL,
  failureRedirect: '/login/failed',
  session: true
}),
function (req, res) {
  console.log('Google called us back!')
})

app.get('/login/failed', function (req, res) {
  res.status(401).json({
    error: true,
    message: 'Log in failure'
  })
})

app.get('/logout', (req, res) => {
  req.logout()
  res.status(200).json({ message: 'Logout successful' })
})

app.get('/applications/:companyName', checkLoggedIn, async function (req, res, next) {
  const companyName = req.params.companyName
  if (companyName.toLowerCase() === 'amazon') {
    res.status(200).send({
      companyName,
      applications: applicationsData
    })
  } else {
    res.status(400).json({
      status: 'Failure',
      message: 'Operation Failed'
    })
  }
})

app.get('/applications/:applicationId/screenFlow', function (req, res, next) {
  const appId = '66ceb688-a2b3-11ed-a8fc-0242ac120002'
  const applicationID = req.params.applicationId
  if (appId === applicationID) {
    res.status(200).send(applicationScreenFlow)
  } else {
    res.status(400).send({
      status: 'Failure',
      message: 'Operation Failed'
    })
  }
})

app.put('/applications/:applicationId/screenFlow', checkLoggedIn, async function (req, res, next) {
  const appId = '66ceb688-a2b3-11ed-a8fc-0242ac120002'
  const applicationID = req.params.applicationId
  const newScreenFlow = req.body
  // console.log('Test')
  console.log(req.url)
  console.log('applicationId: ', applicationID)
  console.log('appId: ', appId)
  console.log(req.body)

  const release = await mutex.acquire()

  if (appId === applicationID && req.body) {
    // Replace its screen flow data
    data.applicationScreenFlow = newScreenFlow
    try {
      // Write updated data back to the file
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8')
    } finally {
      release()
    }
    return res.status(200).send(data.applicationScreenFlow)
  } else {
    res.status(400).send({
      status: 'Failure',
      message: 'Request needs Application Id and active bearer token'
    })
  }
})

// Adding the following endpoint to retrieve the nodes' information
app.get('/applications/:applicationId/nodesInfo', checkLoggedIn, function (req, res, next) {
  const appId = '66ceb688-a2b3-11ed-a8fc-0242ac120002'
  const applicationID = req.params.applicationId
  console.log(nodesInfo)
  if (appId === applicationID) {
    res.status(200).send(nodesInfo)
  } else {
    res.status(400).send({
      status: 'Failure',
      message: 'Request needs Application Id and active bearer token'
    })
  }
})

// Adding following endpoint as Front End will require All the screens information
app.get('/applications/:applicationId/screens', checkLoggedIn, function (req, res, next) {
  const appId = '66ceb688-a2b3-11ed-a8fc-0242ac120002'
  const applicationID = req.params.applicationId
  if (appId === applicationID) {
    res.status(200).send([
      { screenName: 'Home', portNames: ['SignUp', 'Login', 'RandomPage'], view: 'Home' },
      { screenName: 'Login', portNames: [], view: 'Login' },
      { screenName: 'SignUp', portNames: [], view: 'SignUp' },
      { screenName: 'RandomPage', portNames: [], view: 'RandomPage' }
    ])
  } else {
    res.status(400).send({
      status: 'Failure',
      message: 'Request needs Application Id and active bearer token'
    })
  }
  next()
})

app.use('*', function (err, req, res, next) {
  console.log(err)
  res.status(404).send(err)
})

app.listen(port, function () {
  console.log('Server is listening on port: ', port)
})

module.exports = app
