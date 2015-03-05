var connect = require('./connectDb.js').connect

var addStudent = function(name, cb) {
  connect(function(err, db) {
    var studentCollection = db.collection('students')
    var newStudent = {'name': name}
    studentCollection.insert(newStudent, function(err, res){
      cb(res)
      db.close()
    })
  })
}


var listStudents = function(cb) {
  connect(function(err, db) {
    var studentCollection = db.collection('students')
    var res = studentCollection.find().toArray(function(err, items) {
      cb(items)
      db.close()
    })
  })
}


exports.addStudent = addStudent
exports.listStudents = listStudents
