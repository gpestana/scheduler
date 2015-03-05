var express = require('express'),
http        = require('http'),
config      = require('./config.js'),
bodyParser  = require('body-parser'),

manageDb    = require('./src/db/manageDb.js')
dates       = require('./src/lib/dates.js')


//TODO: configs. refactor to another file
hbs         = require('hbs')

server = express()
server.listen(process.env.PORT || 3030)
server.use(bodyParser.json())
server.set('view engine', 'hbs')
server.set('views', __dirname + '/server/views')
hbs.registerPartials(__dirname + '/server/views/partials')

server.use('/static', express.static(__dirname + 'public'))



//init
var app = function() {
  console.log("[main] server started")
}




//TODO: refactor API - move it to ./src/restApi.js

//interface
server.get('/', function(req, res){
  res.sendfile('public/index.html')
})

server.get('/dashboard/teacher/:id', function(req, res){
  res.sendfile('public/teacher/index.html')
})

server.get('/dashboard/student/:id', function(req, res){
  res.sendfile('public/student/index.html')
})





//list all teachers and their availabilities or of a particular teacher
server.get('/teachers', function(req, res) {
  manageDb.listTeachers(function(items) {
    res.json(items)
  }) 
 
})

//get alls slots of a specific teacher
server.get('/teacher/:teacherID', function(req, res) {
  var id = req.params.teacherID
  manageDb.getSlotsTeacher(id, function(slots){
    res.json(slots)  
  })
})


//teacher: add or remove availability
server.post('/teacher/slot', function(req, res){
  if(!req.body.hasOwnProperty('teacherID') || 
     !req.body.hasOwnProperty('time') ||
     !req.body.hasOwnProperty('studentID')) {
    res.statusCode = 400;
    return res.send('[400] availability request not correct')
  }
  
  var teacherID = req.body.teacherID
  var time = req.body.time

  var result = null
  var errors = null

  //TODO: check if teacher exists

  //check if time is correct
  dates.check(time, function(err){
    if(err) {
      errors = 'wrong time type'      
      res.json({'res':result, 'err':errors})
      return
    }
  })

  var studentID = ''
  manageDb.setSlot(teacherID, studentID, time, function(err, result){
      errors = err
      res.json({'res':result, 'err':errors})
      return
  })
})




//student
server.get('/students', function(req, res){
  manageDb.listStudents(function(items){
    res.json(items)
  })
})

server.get('/student/:studentID', function(req, res){
  var id = req.params.studentID
  manageDb.getSlotsStudent(id, function(slots){
    res.json(slots)  
  })
})



//request book slot
server.post('/student/slot', function(req, res){
  if(!req.body.hasOwnProperty('studentID') || 
     !req.body.hasOwnProperty('time') ||
     !req.body.hasOwnProperty('teacherID')) {
    res.statusCode = 400;
    return res.send('[400] booking request incorrect')
  } 

  var studentID = req.body.studentID
  var time = req.body.time
  var teacherID = req.body.teacherID

  var errors = ''
  var result = ''
  
  //TODO: check if student and teacher exist
  
  //check if time is correct
  dates.check(time, function(err){
    if(err) {
      errors = 'wrong time type'      
      res.json({'res':result, 'err':errors})
      return
    }
  })

  manageDb.setSlot(teacherID, studentID, time, function(err, result){
      errors = err
      res.json({'res':result, 'err':errors})
      return
  })

})



//slots
server.get('/slots', function(req, res){
  manageDb.listSlots(function(slots){
    res.json(slots)
  })
})


app()
