const express = require('express');
const app = express();
const routes = require(`../app/routes`);
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('tiny'));

routes(app, express.Router);

module.exports = app;