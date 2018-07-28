const express = require('express');

const routes = express.Router();

const authController = require('./controllers/authController');

routes.get('/', authController.signin); // signin Route
routes.get('/signin', authController.signin); // signin Route
routes.get('/signup', authController.signup); // signup Route

routes.post('/register', authController.register); // signup Route


// GET, POST, PUT, DELETE

module.exports = routes;
