const Schema = require('../schema/schemaCandidates');
const exMsg = require('../../infrastruct/exceptionMessage');
const catcher = require('../../infrastruct/catcher');

module.exports = class OperatorCandidates{

    static async routerGetAll(req,resp){
        return catcher( await this.getAll(), resp);

    }
    static async routeCreateCandidate(objInfo, resp){
        return catcher( await  this.createCandidate(objInfo), resp );

    }
    static async routeGetCandidateById(id, resp){

        catcher( await this.getCandidateById(id), resp );
    
    }
    static async routeUpdateCandidate (req, resp){

        return catcher( await this.updateCandidate(req.body, re.params.id) , resp);
        
    }
    static async routeDeleteCandidate(id, resp){
        return catcher(await this.deleteCandidate(id),resp);
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

        try{ return await Schema.find({'_id':id}) }
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