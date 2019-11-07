const Schema = require('../schema/schemaJob');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorJobs{

    static async getAll (req,resp,next){

        const allJobs = await Schema.find();
        next( allJobs );
    }

    static async createJob (req, resp,next){

        try{
        
            const newJob = await Schema.create(req.body);
            
            next(newJob);

        }catch(err){
            if(err.name == 'ValidationError') next( exMsg(err.message,412) );

            console.log(err); 
            next( exMsg(500,500) );}
    }

    static async getJobById (req, resp,next){

        try{
            const job = await Schema.find({'_id':req.params.id});

            next( job );

        }
        catch(err){
            if(err.name == 'CastError') next( exMsg(404.2,400) );

            console.log(err); 
            next( exMsg(500,500) );
        }
    
    }

    static async updateJob (req, resp,next){

        try{
            if( req.body.candidates )
                next( exMsg('You can not change candidates field. ',409) );
            const result = await Schema.findByIdAndUpdate(req.params.id, req.body);

            //todo: If there is no job with this id
            const jobUpdated = await Schema.findOne({'_id':req.params.id});

            next(jobUpdated);
        }
        catch(err){
            if(err.name == 'CastError') next( exMsg(404.2,404) );
            if(err.name == 'ValidationError')  next( exMsg(err.message,412) );


            console.log(err)
            next( exMsg(500,500) );
        }
        
    }

    static async deleteJob (req, resp,next){

        try{

            const result = await Schema.findByIdAndDelete(req.params.id);
            
            next({message:'Job Deleted.'});

        }
        catch(err){
            if(err.name == 'CastError') next( exMsg(404.2,404) );

            console.log(err)
            next( exMsg(500,500) );
        }

    }

}