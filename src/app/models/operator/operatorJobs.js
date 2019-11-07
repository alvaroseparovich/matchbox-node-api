const Schema = require('../schema/schemaJob');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorJobs{

    static async routeGetAll (req,resp,next){

        next( this.getAll() );
    }

    static async routeCreateJob (req, resp,next){

        next(this.createJob(req.body));
    }

    static async routeGetJobById (req, resp,next){

        next( this.getJobById(req.params.id));   
    }

    static async routeUpdateJob (req, resp,next){

        next( this.updateJob(req.body, req.params.id));        
    }

    static async routeDeleteJob (req, resp,next){

        next( this.deleteJob(req.params.id));

    }


    static async getAll (){
        const allJobs = await Schema.find();
        return allJobs ;

    }
    static async createJob (body){

        try{
        
            const newJob = await Schema.create(body);
            
            return newJob;

        }catch(err){
            if(err.name == 'ValidationError') return  exMsg(err.message,412);

            console.log(err); 
            return  exMsg(500,500);
        }
    }
    static async getJobById (id){

        try{
            const job = await Schema.find({'_id':id});

            next( job );

        }
        catch(err){
            if(err.name == 'CastError') next( exMsg(404.2,400) );

            console.log(err); 
            next( exMsg(500,500) );
        }
    }
    static async updateJob (body, id){

        try{
            if( body.candidates )
                next( exMsg('You can not change candidates field. ',409) );
            await Schema.findByIdAndUpdate(id, body);

            //todo: If there is no job with this id
            const jobUpdated = await Schema.findOne({'_id':id});

            next(jobUpdated);
        }
        catch(err){
            if(err.name == 'CastError') next( exMsg(404.2,404) );
            if(err.name == 'ValidationError')  next( exMsg(err.message,412) );


            console.log(err)
            next( exMsg(500,500) );
        }
    }
    static async deleteJob (id){

        try{

            const result = await Schema.findByIdAndDelete(id);
            console.log(result);
            next({message:'Job Deleted.'});

        }
        catch(err){
            if(err.name == 'CastError') next( exMsg(404.2,404) );

            console.log(err)
            next( exMsg(500,500) );
        }
    }
}