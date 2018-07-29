const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});

routes.get('/', guestMiddleware, authController.signin); // signin Route
routes.get('/signup', guestMiddleware, authController.signup); // signup Route
routes.get('/signout', authController.signout); // signout Route

routes.post('/register', authController.register); // register Route
routes.post('/authenticate', authController.authenticate); // authenticate Route

routes.use('/app', authMiddleware);

routes.get('/app/dashboard', dashboardController.index); // dashboard Route

routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, _next) => {
  res.status(err.status || 500);

  return res.render('errors/index', {
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});
// GET, POST, PUT, DELETE

module.exports = routes;
