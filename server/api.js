var server = require('../index.js')

  res.send('hello world')
})

//list all teachers and their availabilities or of a particular teacher
server.get('/teachers/:teacherID', function(req, res) {
  var listTeachers = ''
  //some db access

  res.json(teacherID)
})

//get availability of a specific teacher
server.get('/teacher/:teacherID', function(req, res) {
  var teacherSlots = ''
  //some db access

  res.json(teacherSlots)
})


//teacher: add or remove availability 
server.post('/teacher', function(req, res){
  if(!req.body.hasOwnProperty('teacherID') ||
     !req.body.hasOwnProperty('time')) {
    res.statusCode = 400
    return res.send('[400] availability request not correct')
  }

  var teacherID = req.body.teacherID
  var time = req.body.time

  //check if teacher exists

  //check if time is correct

  //check if time is scheduled already
  var response = ''
    //if yes: un-book it
      //if slot is already scheduled, send an error saying that it cannot be
      //un-booked
    //if not book it
  res.json(response)
})


//student
server.get('/student/:studentID', function(req, res){
  //check if student exists
  //db to get booked classes
  res.json(response)
})

//add or remove slots by student
server.post('/student/slots', function(req, res){
  if(!req.body.hasOwnProperty('studentID') ||
     !req.body.hasOwnProperty('time') ||
     !req.body.hasOwnProperty('teacherID')) {
    res.statusCode = 400
    return res.send('[400] booking request incorrect')
  }

  var studentID = req.body.studentID
  var time = req.body.time
  var teacherID = req.body.teacherID

  //check if student and teacher exist
  //check if time is available 
  var response = ''

  res.json(response)
})

