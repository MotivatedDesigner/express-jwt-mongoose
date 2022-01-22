module.exports = (req, res, next) => {
  if(req.headers.cookie) {
    req.cookies = {}
    req.headers.cookie
      .split(';').
      forEach(cookie => req.cookies[cookie.split('=')[0].trim()] = cookie.split('=')[1] )
  }
}