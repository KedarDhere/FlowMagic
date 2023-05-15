const express = require('express')
const port = process.env.port || 8000
const app = express()
const auth = require("./auth")
const cors = require('cors')
const { applicationsData } = require('./data.json')
let { applicationScreenFlow } = require('./data.json')

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'data.json'); // Adjust path to your data.json file
let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));


app.use(cors())

var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjc5NzA2NzQ2LCJleHAiOjE3MTEyNDI3NDZ9.BJs3Eiy1e2kaAGhql8R_sEPOxcIaPT0LfNqR4OKR00s'

app.use(function(req, res, next) {
    console.log("Request Received")
    console.log("Method: ", req.method)
    console.log("URL: ", req.url)
    console.log("Body:", req.body)
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
            companyName: companyName,
            applications: applicationsData
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
    if (appId === applicationID){
        res.status(200).send(applicationScreenFlow)
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
    const newScreenFlow = req.body
    // console.log("Test")
    console.log("applicationId: ", applicationID)
    console.log("appId: ", appId)
    console.log("authToken: ", authToken)
    console.log("token: ", token)
    console.log(req.body)
    // if (appId == applicationID && token == authToken && req.body) {
    //     applicationScreenFlow = screenFlow
    //     res.status(200).send(applicationScreenFlow)
    // }
    if (appId == applicationID && token == authToken && req.body) {
        // Replace its screen flow data
        data.applicationScreenFlow.applicationScreenFlow = newScreenFlow;
    
        // Write updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    
        return res.status(200).send(data.applicationScreenFlow);
      }
    else {
        res.status(400).send({
            'status' : 'Failure',
            'message': 'Request needs Application Id and active bearer token'
        })
    }
})

/* Adding following endpoint as Front End will require All the screens information */
app.get('/applications/:applicationId/screens', function (req, res, next) {
    const authToken = req.headers.authorization
    const appId = "66ceb688-a2b3-11ed-a8fc-0242ac120002"
    const applicationID = req.params.applicationId
    console.log("Test")
    if (appId == applicationID) {
        res.status(200).send([
            { screenName: "Home", portNames: ["SignUp", "Login", "RandomPage"], view: "Home" },
            { screenName: "Login", portNames: [], view: "Login" },
            { screenName: "SignUp", portNames: [], view: "SignUp" },
            {screenName: "RandomPage", portNames: [], view: "RandomPage"}            
        ])
    }
    else {
        res.status(400).send({
            'status' : 'Failure',
            'message': 'Request needs Application Id and active bearer token'
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

app.listen(port, function() {
    console.log("Server is listening on port: ", port)
})
