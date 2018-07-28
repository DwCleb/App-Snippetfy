const express = require('express');
const bodyParser = require('body-parser');
const nunjuckus = require('nunjucks');
const path = require('path');

const app = express();

const { User } = require('./app/models');

User.create({ name: 'Cleber', email: 'dwcleb@gmail.com', password: 'cleber' });

nunjuckus.configure(path.resolve('app', 'views'), {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);
