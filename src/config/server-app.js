const express = require('express');
const app = express();
const routes = require(`../app/routes`);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const exMsg = require('../app/infrastruct/exceptionMessage');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(morgan('tiny'));


app.use(routes);
//routes(app, express.Router);

app.use((result, req,resp,next)=>{
    if(!!result.error){
        return resp.status(result.status).send( exMsg( result.error.message ) );
    }else{
        return resp.send(result);
    }

});

module.exports = app;