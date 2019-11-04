const Jobs = require('../models/schema/job');

module.exports = (app,Router)=>{

    const router = Router();

    router.get( '/', async (req, resp)=>{
    
        allJobs = await Jobs.find();
        return resp.send( allJobs );
    
    })

    router.post( '/register', async (req,resp)=>{
        
        try{

            const job = await Jobs.create(req.body);
            
            return resp.send({job}) ;

        }
        catch(err){

            console.log(err);
            return resp.status(400).send({error:'The operation failed'});

        }

    });

    router.get( '/job/:id', async (req, resp)=>{
        try{
            job = await Jobs.find({'_id':req.params.id});

            return resp.send( job );

        }
        catch(err){
            return resp.status(400).send({error:'The operation failed'});
        }
    
    })

    router.put( '/job/:id', async (req, resp)=>{

        try{
            result = await Jobs.findByIdAndUpdate(req.params.id, req.body);
            //todo: If there is no job with this id

            jobUpdated = await Jobs.findOne({'_id':req.params.id});

            return resp.send(jobUpdated);
        }
        catch(err){
            console.log(err)
            return resp.status(400).send({error:'The operation failed'})
        }
        
    })

    router.delete( '/job/:id', async (req, resp)=>{

        try{
            result = await Jobs.findByIdAndDelete(req.params.id);
            //todo: If there is no job with this id

            return resp.send(result);
        }
        catch(err){
            return resp.status(400).send({error:'The operation failed'})
        }

    })

    return router;
}