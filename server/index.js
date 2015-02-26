var express = require('express')
var app = express()
var path = require('path')

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.sendFile('index.html', {root: 'templates'})
})
console.log('dirname', __dirname)
console.log(path.join(__dirname, '..', 'build'))
app.use(express.static(path.join(__dirname, '..', 'build')))

var server = app.listen((process.env.PORT || 10000), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Lebowski Haiku Generator listening at http://%s:%s', host, port)

})
