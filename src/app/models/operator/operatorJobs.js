const Schema = require('../schema/schemaJob');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorJobs{

    static async routeGetAll (next){

        next( await this.getAll() );
    }

    static async routeCreateJob (json,next){
        
        next( await this.createJob(json));
    }

    static async routeGetJobById (id,next){

        next( await this.getJobById(id));   
    }

    static async routeUpdateJob (json, id, next){

        next( await this.updateJob(json, id));        
    }

    static async routeDeleteJob (id,next){

        next( await this.deleteJob(id));

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
            
            return await Schema.find({'_id':id});

        }
        catch(err){
            if(err.name == 'CastError') return exMsg(404.2,400);

            console.log(err); 
            return exMsg(500,500) ;
        }
    }
    static async updateJob (body, id){

        try{
            if( body.candidates )
                return exMsg('You can not change candidates field. ',409 );
            await Schema.findByIdAndUpdate(id, body);

            //todo: If there is no job with this id
            return await Schema.findOne({'_id':id});

        }
        catch(err){
            if(err.name == 'CastError') return exMsg(404.2,404);
            if(err.name == 'ValidationError')  return exMsg(err.message,412);


            console.log(err)
            return exMsg(500,500);
        }
    }
    static async deleteJob (id){

        try{

            const result = await Schema.findByIdAndDelete(id);
            console.log(result);
            return {message:'Job Deleted.'};

        }
        catch(err){
            if(err.name == 'CastError') return exMsg(404.2,404);

            console.log(err)
            return exMsg(500,500);
        }
    }
}