var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');

require('./models/migrate')

var User = require('./models/users')

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var magicians = require('./routes/magicians');
var dashboard = require('./routes/dashboard');

var app = express();


// less middleware setup

app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(expressSession({
    secret: '1234567890QWERTY'
}));
app.use(express.static(path.join(__dirname, 'public')));


var Magician = require('./models/magicians');
app.use(/\/(magicians|dashboard).*/, function(req, res, next) {
    if (req.session.magician_id != undefined) {
        var id = req.session.magician_id
        Magician.find({
            where: {
                id: id
            }
        }).then(function(magician) {
            if (magician == null) {
                res.redirect('/login');
            } else {
                res.locals.magician = magician
                next();
                // res.render('dashboard', { 
                //     magician: magician,
                //     title: 'dashboard' 
                // });
            }
        });
    } else {
        res.redirect('/login');
    }
})


app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/magicians', magicians);
app.use('/dashboard', dashboard);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
