var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.sendFile('index.html', {root: 'templates'})
})
app.use(express.static('build'))

var server = app.listen(10000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Lebowski Haiku Generator listening at http://%s:%s', host, port)

})
