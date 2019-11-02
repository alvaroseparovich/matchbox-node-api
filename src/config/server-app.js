const express = require('express');
const app = express();
const routes = require(`../app/routes`);
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

routes(app, express);

module.exports = app;