const jwt = require("jsonwebtoken")

function checkWebToken(req, res, next) {
    const authHeader = req.get('authorization') || ''
    const authParts = authHeader.split(' ')
    const token = authParts [0] === 'Bearer' ? authParts[1] : null

    jwt.verify(token, 'secretKey', function(err, decoded) {
        if (err) {
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
            }
            res.status(401).send({
              "status": 'FAILURE',
              "message": err
            })
        }
        else {
          next()
        }
      })
}

exports.checkWebToken = checkWebToken