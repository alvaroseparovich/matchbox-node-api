const Schema = require('../schema/schemaCandidates');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorCandidates{

    static async routeGetAll(next){
        next( await this.getAll());

    }
    static async routeCreateCandidate(objInfo, next){
        next( await  this.createCandidate(objInfo) );

    }
    static async routeGetCandidateById(id, next){
        next( await this.getCandidateById(id));
    
    }
    static async routeUpdateCandidate (json, id, next){
        next( await this.updateCandidate(json, id) );
        
    }
    static async routeDeleteCandidate(id, next){
        next(await this.deleteCandidate(id));
    }

    static async getAll(){
        
        try{
            
            const response =  await Schema.find();
            return response;

        }catch(err){
            return exMsg(err,500);
        }


    }
    static async createCandidate(objInfo){
        
        try{

            const emailExists = !!await Schema.findOne({email: objInfo.email});
            if(emailExists) 
                return exMsg('This email has already been used',409);
        
            const newCandidate = await Schema.create(objInfo);

            newCandidate.password = undefined;
            
            return newCandidate;

        }catch(err){
            if(err.name == 'ValidationError') return exMsg(err.message, 412);
            console.log(err); 
            return exMsg(500,500);}
    }
    static async getCandidateById(id){

        try{ return await Schema.find({_id:id}) }
        catch(err){
            if(err.name == 'CastError') return  exMsg(404.1,404);
            console.log(err); 
            return exMsg(500,500);
        }
    
    }
    static async updateCandidate (objToAtualize, id){

        try{
            
            if( objToAtualize.email )
                return exMsg('You can not change a email. ',409 );
            if( objToAtualize.jobs )
                return exMsg('You can not change jobs field. ',409 );
            
            const result = await Schema.findByIdAndUpdate(id, objToAtualize);
            
            const candidateUpdated = await Schema.findOne({'_id':id});

            return candidateUpdated;
        }
        catch(err){
            if(err.name == 'CastError') return exMsg( 404.1, 404 );
            if(err.name == 'ValidationError') return exMsg(err.message,412 );
            console.log(err);
            return exMsg(500, 500 );
        }
        
    }
    static async deleteCandidate(id){

        try{

            await Schema.findByIdAndDelete(id);
            
            return {message:'Candidate Deleted.'};

        }
        catch(err){
            if(err.name == 'CastError') return exMsg(404.1, 404) ;
            console.log(err)
            return exMsg(500,500);
        }

    }

}