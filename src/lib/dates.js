//YYYY.MM.DD.HH.MM

var check = function(time, cb) {
  var err = null
  //check if time is correct

  cb(err)
}


var isDate = function(dateInput, cb){
  var dateArr = dateInput.split('.')
  var res = true  

  if(dateArr.length != 5) {
    cb(false); return
  }

  var year = dateArr[0]
  var month = dateArr[1]
  var day  = dateArr[2]
  var hour = dateArr[3]
  var minutes = dateArr[4]

  cb(res)
}

var isDateFuture = function (date, cb){
  now = new Date()
  stringToDate(date, function(parsedDate){
    cb(now<parsedDate)
  }) 
}

var stringToDate = function(dateString, cb) {
  date = dateString.split('.')
  
  var year = dateArr[0]
  var month = dateArr[1]
  var day  = dateArr[2]
  var hour = dateArr[3]
  var minutes = dateArr[4]

  date = new Date(year, month, day, hour, minutes)
  cb(date)
}


exports.check = check
exports.isDate = isDate
exports.isDateFuture = isDateFuture
