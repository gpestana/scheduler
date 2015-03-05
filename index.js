var express = require('express'),
http        = require('http'),
config      = require('./config.js'),

manageDb    = require('./server/db/manageDb.js')

//configs. refactor to another file
hbs         = require('hbs')

server = express()
server.listen(process.env.PORT || 3030)
server.set('view engine', 'hbs')
server.set('views', __dirname + '/server/views')
hbs.registerPartials(__dirname + '/server/views/partials')
server.use('/static', express.static(__dirname + '/public'))



//init
var app = function() {
  console.log("[main] server started")
}


//API
server.get('/', function(req, res){
  res.send('hello world')
})

//list all teachers and their availabilities or of a particular teacher
server.get('/teachers/:teacherID', function(req, res) {
  var listTeachers = ''
  //some db access
  
  res.json(listTeachers)
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
    res.statusCode = 400;
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


server.post('/student/slots', function(req, res){
  if(!req.body.hasOwnProperty('studentID') || 
     !req.body.hasOwnProperty('time') ||
     !req.body.hasOwnProperty('teacherID')) {
    res.statusCode = 400;
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


//sandbox
server.get('/allStudents/', function(req, res) {
  manageDb.listStudents(function(r){
    console.log(r)
    res.json(r)
  })
})

server.get('/addStudent', function(res, res) {
  manageDb.addStudent('goncalo', function(){
    console.log('goncalo added')
  })
})


app()
