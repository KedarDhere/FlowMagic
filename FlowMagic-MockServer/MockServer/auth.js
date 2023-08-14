module.exports = function checkLoggedIn (req, res, next) {
  console.log(req.cookies)
  console.log('Current user is:', req.user)
  const isLoggedIn = req.isAuthenticated() && req.user
  if (!isLoggedIn) {
    console.log('Error')
    return res.status(401).json({
      error: 'You must log in!'
    })
  }
  next()
}
