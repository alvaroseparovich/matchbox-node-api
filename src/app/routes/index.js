const Candidates = require('../models/candidate');

module.exports = (app, router)=>{

    router.post('/register', async (req,resp)=>{
        try{
            const candidate = await Candidates.create(req.body).catch();
            return resp.send({candidate}) ;
        }catch(err){
            console.log(err);
            return resp.status(400).send({error:'Fail to register candidate'});
        }
    });

    app.use('/candidate', router);
}