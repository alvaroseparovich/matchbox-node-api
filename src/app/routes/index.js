routes = {
    'candidates'        : require('./candidates'), 
    'jobs'              : require('./jobs'),
    'relationship'      : require('./relationship'),
}

module.exports = (app)=>{
    app.get(`/*`, (req,resp)=>{
        resp.send(`GET - ${req.url} \n`);
    });
    app.post(`/*`, (req,resp)=>{
        resp.send(`POST \n`);
    });
    app.put(`/*`, (req,resp)=>{
        resp.send(`PUT \n`);
    });
    app.delete(`/*`, (req,resp)=>{
        resp.send(`DELETE \n`);
    });
}