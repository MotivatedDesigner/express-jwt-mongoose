
app.use((err, req, res, next) => {
  if(err.status){
    res.status(err.status).send(err)
    next()
  }
})