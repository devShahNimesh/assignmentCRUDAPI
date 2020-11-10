const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//Routes
const users = require('./routes/users');
const config = require('./config');


// express app
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// User Route
app.use('/users', users);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(config.mongodbUserUrl);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', ()=>{
    console.log('connected to mongodb user ');

});

module.exports = app;
