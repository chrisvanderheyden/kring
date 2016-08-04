var express = require('express')
  , session           =     require('express-session')
  , passport          =     require('passport')
  , util              =     require('util')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , config            =     require('./configuration/config')
  , path = require('path')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon');

var app = express();



passport.serializeUser(function(user, done) {
  
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//Set up facebook strategy
passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret:config.facebookAuth.clientSecret ,
    callbackURL: config.facebookAuth.callbackURL,
     passReqToCallback : true,
     profileFields: ['id', 'emails', 'name']
  },  

  function(req, accessToken, refreshToken, profile, done) {
    console.log('args');
    process.nextTick(function () {
      if(config.use_database==='true')
      {
         
      }
      if(done !== undefined)
        return done(null, profile);
    });
  }
));


//Set up google strategy
passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientID,
    clientSecret:config.googleAuth.clientSecret ,
    callbackURL: config.googleAuth.callbackURL
  },  

  function (accessToken, refreshToken, profile, done) {
    console.log('args');
    process.nextTick(function () {
      if(config.use_database==='true')
      {
         
      }
      if(done !== undefined)
        return done(null, profile);
    });
  }
));






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.disable('etag');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'sdqfqsdfqsdf' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/auth',  require('./routes/auth'));
app.use('/api',  require('./routes/api'));



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
