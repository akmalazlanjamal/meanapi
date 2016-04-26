// BASE SETUP
// ==========

// CALL THE PACKAGES --------
var express = require('express'); // call express
var app     = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan     = require('morgan'); // used to see requests
var mongoose   = require('mongoose'); // for working w/ our database
var port       = process.env.PORT || 1234; // set the port for our app

var User = require('./app/models/user');

//connect to our database (hosted locally)
mongoose.connect('mongodb://localhost:27017/meanapidb');

// APP CONFIGURATION ---------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
});

// log all requests to the console
app.use(morgan('dev'));

// ROUTES FOR OUR API
// ==================

// basic route for the home page
app.get('/', function (req, res) {
    res.send('Welcome to the home page!');
});



// get an instance of the express router
var apiRouter = express.Router();

// middleware to use for all requests
apiRouter.use(function (req, res, next) {
    // do logging
    console.log('Somebody just came to our app!');

    // we'll add more to the middleware in Chapter 10
    // this is where we will authenticate users

    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working
// accessed at GET http://localhost:1234/api
apiRouter.get('/', function (req, res) {
    res.json(({ message: 'hooray! welcome to our api!' }));
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRouter);

// START THE SERVER
// ================
app.listen(port);
console.log('Magic happens at port ' + port);