const CandidatesSchema = require('../schema/schemaCandidates');
const JobsSchema = require('../schema/schemaJob');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorCandidates{

    static async responseAttatchCandidatesToAJob(list,jobId, next){
        list = list.filter(item=>{
            if (!!item._id){return item}
        });

        await this.removeCandidatesFromJob(list,jobId);
        const job = await this.addCandidatesInJob(list,jobId);
        
        await this.removeJobFromCandidates(list,jobId);
        const candidates = await this.addJobInCandidates(list,jobId);

        next({
            job:job,
            candidates:candidates
        })
    }

    static async responseRemoveCandidatesFromAJob(list,jobId, next){
        list = list.filter(item=>{
            if (!!item._id){return item}
        });

        await this.removeCandidatesFromJob(list,jobId);
        await this.removeJobFromCandidates(list,jobId);

        next({
            message:'Conections removed. '
        })
    }

    //List prepared
    static async removeJobFromCandidates( candidateId, jobId){
        return await this.upDateManyRelation( candidateId,{$pull:{jobs:{_id:jobId}}}, CandidatesSchema);

    }//List prepared
    static async addCandidatesInJob(candidate, jobId){
        return await this.upDateRelation( jobId,{$push:{candidates:{
            $each:candidate 
         }}}, JobsSchema );
    }//List prepared
    static async removeCandidatesFromJob(candidate, jobId){
        return await this.upDateRelation( jobId,{$pull:{candidates:{
            $in:candidate 
         }}}, JobsSchema );
    }//List prepared
    static async addJobInCandidates(candidateId, jobId){
        return await this.upDateManyRelation( candidateId,{$push:{jobs:{_id:jobId}}}, CandidatesSchema);

    }//List prepared
    static async upDateManyRelation(idAfected,relation, SchemaAfected){

        try{
            if(!idAfected) return exMsg('A id was missing',412);
            
            await SchemaAfected.updateMany({_id:idAfected},relation);

            return await SchemaAfected.find({'_id':idAfected});
        }
        catch(err){
            if(err.name == 'CastError') return exMsg(404.3, 404);
            if(err.name == 'ValidationError') return exMsg(err.message, 412);
            
            return exMsg(500, 500) ;
        }
    }
    
    static async upDateRelation(idAfected,relation, SchemaAfected){

        try{
            if(!idAfected) return exMsg('A id was missing',412);
            
            await SchemaAfected.findByIdAndUpdate(idAfected,relation);

            return await SchemaAfected.findOne({'_id':idAfected});
        }
        catch(err){
            if(err.name == 'CastError') return exMsg(404.3, 404);
            if(err.name == 'ValidationError') return exMsg(err.message, 412);
            
            return exMsg(500, 500) ;
        }
    }
}