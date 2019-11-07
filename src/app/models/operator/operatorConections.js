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

    static async responseAttatchJobsToACandidate(list,candidateId, next){
        list = list.filter(item=>{
            if (!!item._id){return item}
        });
    
        await this.removeJobsFromCandidate(list,candidateId);
        const candidate = await this.addJobsInCandidate(list,candidateId);
        
        await this.removeCandidateFromJobs(list,candidateId);
        const jobs = await this.addCandidateInJobs(list,candidateId);
    
        next({
            candidate:candidate,
            jobs:jobs
        })
    }
    
    static async responseRemoveJobsFromACandidate(list,candidateId, next){
        list = list.filter(item=>{
            if (!!item._id){return item}
        });
    
        await this.removeJobsFromCandidate(list,candidateId);
        await this.removeCandidateFromJobs(list,candidateId);
    
        next({
            message:'Conections removed. '
        })
    }
    

    //Operations Single Job to Many Candidates
    //List prepared
    static async removeJobFromCandidates( candidates, jobId){
        return await this.upDateManyRelation( candidates,{$pull:{jobs:{_id:jobId}}}, CandidatesSchema);

    }//List prepared
    static async addCandidatesInJob(candidates, jobId){
        return await this.upDateRelation( jobId,{$push:{candidates:{
            $each:candidates
         }}}, JobsSchema );
    }//List prepared
    static async removeCandidatesFromJob(candidates, jobId){
        return await this.upDateRelation( jobId,{$pull:{candidates:{
            $in:candidates
         }}}, JobsSchema );
    }//List prepared
    static async addJobInCandidates(candidates, jobId){
        return await this.upDateManyRelation( candidates,{$push:{jobs:{_id:jobId}}}, CandidatesSchema);

    }
    
    //Operations Single Candidate to Many Jobs
    //List prepared
    static async removeCandidateFromJobs( jobs, candidateId){
        return await this.upDateManyRelation( jobs,{$pull:{candidates:{_id:candidateId}}}, JobSchema);

    }//List prepared
    static async addJobsInCandidate(jobs, candidateId){
        return await this.upDateRelation( candidateId,{$push:{jobs:{
            $each:jobs
        }}}, JobsSchema );
    }//List prepared
    static async removeJobsFromCandidate(jobs, candidateId){
        return await this.upDateRelation( candidateId,{$pull:{jobs:{
            $in:jobs
        }}}, JobsSchema );
    }//List prepared
    static async addCandidateInJobs(jobs, candidateId){
        return await this.upDateManyRelation( jobs,{$push:{candidates:{_id:candidateId}}}, JobSchema);

    }



    //List prepared
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