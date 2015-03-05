var connect = require('./connectDb.js').connect

/*
 * teachers
 */

var addTeacher = function(name, cb) {
  connect(function(err, db) {
    var teachersCollection = db.collection('teachers')
    var newTeacher = {'name': name}
    teacherCollection.insert(newTeacher, function(err, res){
      cb(res)
      db.close()
    })
  })
}

var listTeachers = function(cb) {
  connect(function(err, db) {
    var teachersCollection = db.collection('teachers')
    teachersCollection.find().toArray(function(err, items) {
      cb(items)
      db.close()
    })
  })
}


var getSlotsTeacher = function(id, cb) {
  connect(function(err, db) {
    var slotsCollection = db.collection('slots')
    slotsCollection.find({'teacher': id}).toArray(function(err, items) {
      cb(items)
      db.close()
    })
  })
} 



/*
 * students
 */

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
    studentCollection.find().toArray(function(err, items) {
      cb(items)
      db.close()
    })
  })
}

var getSlotsStudent = function(id, cb) {
  connect(function(err, db) {
    var slotsCollection = db.collection('slots')
    slotsCollection.find({'student': id}).toArray(function(err, items) {
      cb(items)
      db.close()
    })
  })
} 



/*
 * slots
 */
var listSlots = function(cb) {
  connect(function(err, db) {
    var slotsCollection = db.collection('slots')
    slotsCollection.find().toArray(function(err, items) {
      cb(items)
      db.close()
    })
  })
}



/*
setSlot:
 - check if teacher's slot is booked
  - if slot is not booked:
      - set it available (if studentID == '')
      - book it (if studentID exists)
*/

var setSlot = function(teacherID, studentID, time, cb) {
  connect(function(err, db) {
    var slotsCollection = db.collection('slots')
  
    slotsCollection.findOne({'teacher': teacherID, 'time':time}, function(err, items) {
      console.log(items)
      var error = null
      var results = null
    
      //booked already
      if(items!=null) {
        error = teacherID+' at '+time+' already booked'
        cb(error, results)
        return

      } else {
        slotsCollection.insert({teacher:teacherID, student: studentID, time: time}, 
          function(err, res) {
            if (studentID == '') {result = teacherID+' at '+time+' is available now'}
            else {result = studentID+' booked '+time+' with '+teacherID}
            cb(error, result)
          })
      }
    })

  })
}




exports.listTeachers = listTeachers
exports.getSlotsTeacher = getSlotsTeacher

exports.addStudent = addStudent
exports.listStudents = listStudents
exports.getSlotsStudent = getSlotsStudent

exports.listSlots = listSlots
exports.setSlot = setSlot

