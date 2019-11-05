const Schema = require('../schema/schemaJob');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorJobs{

    static async getAll (req,resp){

        const allJobs = await Schema.find();

        return resp.status(200).send( allJobs );
    }

    static async createJob (req, resp){

        try{
        
            const newJob = await Schema.create(req.body);
            
            return resp.send(newJob);

        }catch(err){
            if(err.name == 'ValidationError') return resp.status(412).send( exMsg(err.message) );

            console.log(err); 
            return resp.status(500).send( exMsg(500) );}
    }

    static async getJobById (req, resp){

        try{
            const job = await Schema.find({'_id':req.params.id});

            return resp.send( job );

        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.2) );

            console.log(err); 
            return resp.status(500).send( exMsg(500) );
        }
    
    }

    static async updateJob (req, resp){

        try{
            if( req.body.candidates )
                return resp.status(409).send( exMsg('You can not change candidates field. ') );
            const result = await Schema.findByIdAndUpdate(req.params.id, req.body);

            //todo: If there is no job with this id
            const jobUpdated = await Schema.findOne({'_id':req.params.id});

            return resp.send(jobUpdated);
        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.2) );
            if(err.name == 'ValidationError') return resp.status(412).send( exMsg(err.message) );


            console.log(err)
            return resp.status(500).send( exMsg(500) );
        }
        
    }

    static async deleteJob (req, resp){

        try{

            const result = await Schema.findByIdAndDelete(req.params.id);
            
            return resp.send({message:'Job Deleted.'});

        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.2) );

            console.log(err)
            return resp.status(500).send( exMsg(500) );
        }

    }

}