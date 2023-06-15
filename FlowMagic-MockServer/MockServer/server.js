const express = require('express')
const port = process.env.port || 8000
const app = express()
const ensureAuthenticated = require('./auth')
const cors = require('cors')
const { applicationsData, nodesInfo } = require('./data.json')
const { applicationScreenFlow } = require('./data.json')

const fs = require('fs')
const path = require('path')

const dataFilePath = path.join(__dirname, 'data.json') // Adjust path to your data.json file
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))

const { Mutex } = require('async-mutex')
const mutex = new Mutex()

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require("dotenv").config();
const cookieSession = require('cookie-session')
const passportSetup = require('./passport')

app.use(function (req, res, next) {
  console.log('Request Received')
  console.log('Method: ', req.method)
  console.log('URL: ', req.url)
  console.log('Body:', req.body)
  next()
})

app.use(express.json())

app.use(
  cookieSession({
    name: 'session',
    keys: ['secret']
  })
)

app.use(cors({
  origin: 'http://localhost:3000/*',
  methods: 'GET,POST,PUT',
  credentials: true
}
))

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/callback', passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}))


app.get("/login/failed", function (req, res) {
    res.status(401).json({
        error: true,
        message: "Log in failure"
    })
})

// Checks if user is login
app.get("/login/success", function (req, res) {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Logged In",
            user: req.user
        })
    } else {
        res.status(403).json({
            error: true,
            message: "Not Authorized"
        })
    }
})

app.get("/logout", function (req, res) {
    req.logOut()
    res.redirect("/auth")
})

app.get('/auth' , passport.authenticate('google', ['email', 'profile' ]));

app.get('/applications/:companyName', ensureAuthenticated, async function (req, res, next) {
  const authToken = req.headers.authorization
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

app.get('/applications/:applicationId/screenFlow', ensureAuthenticated, function (req, res, next) {
  const authToken = req.headers.authorization
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

app.put('/applications/:applicationId/screenFlow', ensureAuthenticated, async function (req, res, next) {
  const authToken = req.headers.authorization
  const appId = '66ceb688-a2b3-11ed-a8fc-0242ac120002'
  const applicationID = req.params.applicationId
  const newScreenFlow = req.body
  // console.log("Test")
  console.log('applicationId: ', applicationID)
  console.log('appId: ', appId)
  console.log('authToken: ', authToken)
  console.log('token: ', token)
  console.log(req.body)

  const release = await mutex.acquire()
  if (appId == applicationID && token == authToken && req.body) {
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
app.get('/applications/:applicationId/nodesInfo', ensureAuthenticated, function (req, res, next) {
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
app.get('/applications/:applicationId/screens', ensureAuthenticated, function (req, res, next) {
  const authToken = req.headers.authorization
  const appId = '66ceb688-a2b3-11ed-a8fc-0242ac120002'
  const applicationID = req.params.applicationId
  console.log('Test')
  if (appId == applicationID) {
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
  // res.status(404).send({
  //     // err: "This URL was not recognized: " + req.originalUrl
  //     err: err
  // })
  console.log(err)
  res.status(404).send(err)
})

app.listen(port, function () {
  console.log('Server is listening on port: ', port)
})
