var express = require('express');

 //STEP 1 - Reference to mongoose
var mongoose = require('mongoose');

//STEP 2- Open a connection to mongoDB , Event API is the name of the DB in Mongo
var db = mongoose.connect('mongodb://localhost/eventsDB');

//STEP 3 - As mongoose converts documents in mongoDB to json(model), we need a model
var Event = require('./models/eventModel')

var app = express();
var port = process.env.PORT || 3002;

//var eventRouter = express.Router();

var bodyParser = require('body-parser'); // Reference to bodyparser
// We have to tell app that we are going to use body parser
//app.use(bodyParser)  // Not this
// we have to explicitly tell we are using json parser // support parsing of application/json type post data
app.use(bodyParser.json()) 
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended:true})) 

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Call the route module with Event model injected
var eventRouter = require('./routes/eventRoutes')(Event);

app.use('/api', eventRouter);



app.listen(port, function () {
    console.log('Running on port ' + port);
})
