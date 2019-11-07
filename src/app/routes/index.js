const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();



//Import all main routes at once
const routes = {};
fs
.readdirSync(__dirname)
.filter(file => ((file.indexOf('.')) !==0 && (file !== 'index.js')))
.forEach(file => {

    const filename = file.split('.')[0];
    
    routes[ filename ] = require( path.resolve( __dirname, filename ) ); 
   
    router.use(`/${filename}`, routes[ filename ] )

});

module.exports = router;