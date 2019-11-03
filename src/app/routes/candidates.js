const Candidates = require('../models/candidate');

module.exports = (app,Router)=>{

    const router = Router();

    router.get( '/', async (req, resp)=>{
    
        allCandidates = await Candidates.find();
        return resp.send( allCandidates );
    
    })

    router.post( '/register', async (req,resp)=>{

        const {email} = req.body;
        
        try{
            if( await Candidates.findOne({email}) ){
                return resp.status(400).send({erro:'This email has already been used'})
            }

            const candidate = await Candidates.create(req.body).catch();
            
            candidate.password = undefined;
            
            return resp.send({candidate}) ;

        }
        catch(err){

            console.log(err);
            return resp.status(400).send({error:'The operation failed'});

        }

    });

    router.get( '/candidate/:id', async (req, resp)=>{
        try{
            candidate = await Candidates.find({'_id':req.params.id});

            return resp.send( candidate );

        }
        catch(err){
            return resp.status(400).send({error:'The operation failed'});
        }
    
    })

    router.put( '/candidate/:id', async (req, resp)=>{

        try{
            result = await Candidates.findByIdAndUpdate(req.params.id, req.body);
            //todo: If there is no candidate with this id

            candidateUpdated = await Candidates.findOne({'_id':req.params.id});

            return resp.send(candidateUpdated);
        }
        catch(err){
            console.log(err)
            return resp.status(400).send({error:'The operation failed'})
        }
        
    })

    router.delete( '/candidate/:id', async (req, resp)=>{

        try{
            result = await Candidates.findByIdAndDelete(req.params.id);
            //todo: If there is no candidate with this id

            return resp.send(result);
        }
        catch(err){
            return resp.status(400).send({error:'The operation failed'})
        }

    })

    return router;
}