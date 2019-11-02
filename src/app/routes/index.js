const Candidates = require('../models/candidate');

module.exports = (app, router)=>{

    router.post('/register', async (req,resp)=>{
        const {email} = req.body;
        try{
            if(await Candidates.findOne({email})){
                return resp.status(400).send({erro:'This email has already been used'})
            }

            const candidate = await Candidates.create(req.body).catch();
            
            candidate.password = undefined;
            
            return resp.send({candidate}) ;

        }
        catch(err){

            console.log(err);
            return resp.status(400).send({error:'Fail to register candidate'});

        }
    });

    router.get('/', async (req, resp)=>{
        allCandidates = await Candidates.find();
        return resp.send( allCandidates );
    })

    app.use('/candidates', router);
}