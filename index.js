const express = require('express');
const bodyParser = require('body-parser');
const nunjuckus = require('nunjucks');
const path = require('path');
const routes = require('./app/routes');

const app = express();

nunjuckus.configure(path.resolve('app', 'views'), {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(3000);
