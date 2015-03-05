var express = require('express'),
http        = require('http')


server = express()
server.listen(process.env.PORT || 3030)
server.get('/', function(req, res){
  res.send('hello world')
})
