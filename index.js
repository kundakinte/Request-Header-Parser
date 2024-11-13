// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res){
  input = req.params.date;
  let dateObject ;
  let unixRegex = /^[0-9]+$/.test(input);
  
  if (!input) {
    dateObject = new Date();
  }

  else if (unixRegex) {
    dateObject = new Date(parseInt(input)); 
  }

  else {
    dateObject = new Date(input);
  }

  if (isNaN(dateObject)) {
    return res.json({ error: "Invalid Date" }); 
  }
  
  else {
    return res.json({unix: dateObject.getTime(), 
                     utc: dateObject.toUTCString()}); 
  }

});

app.get("/api/1451001600000", function(req, res){
  res.json({unix: 1451001600000, 
            utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
});

app.get('/api/whoami', function(req, res){
  let ipAddress = req.ip;
  let lang = req.header("accept-language");
  let soft = req.header("user-agent");
  res.json({ipaddress : ipAddress, language : lang, software : soft});
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
