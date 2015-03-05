var DB = require('mongodb').Db,
client = require('mongodb').MongoClient

var remoteURI = 'mongodb://user:user@ds029950.mongolab.com:29950/scheduler'

var connect = function(cb) {
  client.connect(remoteURI, function(err, db) {
    cb(err, db)
  })
}

exports.connect = connect
