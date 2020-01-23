// Require Dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressHbs = require('express-handlebars');
const UiRoutes = require('./routes/ui-routes');
const apiAction = require('./actions/api-actions');


// Configure Express App
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let hbs = expressHbs.create({
  defaultLayout: "main-layout",
  extname: 'hbs',
  partialsDir: [
    path.join(__dirname, 'views/partials/')
  ]

});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

// Static Assets path setup
app.use(express.static(path.join(__dirname, 'webapps')));
app.use(express.static(path.join(__dirname, 'dist')));





// Init Routes
const uiRoutes = new UiRoutes(app);
const apiActions = new apiAction(app);
uiRoutes.init();
apiActions.init();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>  {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
