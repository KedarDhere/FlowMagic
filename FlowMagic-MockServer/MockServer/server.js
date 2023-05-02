const express = require('express')
const port = process.env.port || 8000
const app = express()
const auth = require("./auth")
const cors = require('cors')

app.use(cors())

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc5NzA2NzQ2LCJleHAiOjE3MTEyNDI3NDZ9.BJs3Eiy1e2kaAGhql8R_sEPOxcIaPT0LfNqR4OKR00s'

app.use(function(req, res, next) {
    console.log("Request Received")
    console.log("Method: ", req.method)
    console.log("URL: ", req.url)
    next()
})

app.use(express.json())

app.post('/user/login', function(req,res, next) {
    if (req.body && req.body.username && req.body.password){
        res.status(200).send({
            token: token
        })
    }
    else{
        res.send({
            'status': 'Failure',
            "message": err
        })
    }
})

app.post('/user/logout', auth.checkWebToken, async function(req, res, next) {
        token = " "
        res.status(200).send({
            "status": "SUCCESS",
            "message": "Logout successful"
        })
})

app.get('/applications/:companyName', auth.checkWebToken, async function (req, res, next) {
    const authToken = req.headers.authorization
    const companyName = req.params.companyName
    if (companyName.toLowerCase() === "amazon") {
        res.status(200).send({
            applications: [
                {
                    "applicationId": "66ceb688-a2b3-11ed-a8fc-0242ac120002",
                    "applicationName": "SocialBook"
                },
                {
                    "applicationId": "66ceb688-a2b3-11ed-a8fc-0242ac120003",
                    "applicationName": "Instagram"
                },
                {
                    "applicationId": "66ceb688-a2b3-11ed-a8fc-0242ac120004",
                    "applicationName": "Music"
                }
            ]
        })
    } else {
            res.status(400).json({
                "status" : "Failure",
                "message" : "Operation Failed"
            })
        }
})

app.get('/applications/:applicationId/screenFlow', function(req, res, next) {
    const authToken = req.headers.authorization
    const appId = "66ceb688-a2b3-11ed-a8fc-0242ac120002"
    const applicationID = req.params.applicationId
    // console.log("Test")
    // console.log("applicationId: ", applicationID)
    // console.log("appId: ", appId)
    // console.log("authToken: ", authToken)
    // if (appId == applicationID && token == authToken){
    if (appId == applicationID){
        res.status(200).send({
            "applicationId": "66ceb688a2b311eda8fc0242ac120002",
            "applicationScreenFlow": [
              {
                "screenName": "Home",
                "portName": "Home.RandomPage",
                "destinationView": "RandomPage"
              },
              {
                "screenName": "Login",
                "portName": "Home.Login",
                "destinationView": "SignUp"
              },
              {
                "screenName": "SignUp",
                "portName": "Home.SignUp",
                "destinationView": "RandomPage"
              }
            ]
          })
    }
    else {
        res.status(400).send({
            "status" : "Failure",
            "message" : "Operation Failed"
        })
        }
})

app.put('/applications/:applicationId/screenFlow', function(req, res, next) {
    const authToken = req.headers.authorization
    const appId = "66ceb688-a2b3-11ed-a8fc-0242ac120002"
    const applicationID = req.params.applicationId
    // console.log("Test")
    console.log("applicationId: ", applicationID)
    console.log("appId: ", appId)
    console.log("authToken: ", authToken)
    console.log("token: ", token)
    console.log(req.body)
    if (appId == applicationID && token == authToken && req.body){
        res.status(200).send(req.body)
    }
    else {
        res.status(400).send({
            'status' : 'Failure',
            'message': 'Request needs Application Id and active bearer token'
        })
    }
    next()
})
app.use('*', function(err,req, res, next) {
    // res.status(404).send({
    //     // err: "This URL was not recognized: " + req.originalUrl
    //     err: err
    // })
    console.log(err)
    res.status(404).send(err)
})

app.listen(port, function() {
    console.log("Server is listening on port: ", port)
})
