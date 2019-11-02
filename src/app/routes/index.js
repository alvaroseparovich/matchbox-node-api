const fs = require('fs');
const path = require('path');

module.exports = (app, Router)=>{
    const routes = {};
    
    //Import all routes at once
    fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !==0 && (file !== 'index.js')))
    .forEach(file => {

        const filename = file.split('.')[0];
        
        routes[ filename ] = require( path.resolve( __dirname, filename ) )(app,Router); 
    });

    //Use all routes at once
    Object.keys(routes)
        .forEach(index=>{
            app.use(`/${index}`, routes[index]);
        })
}