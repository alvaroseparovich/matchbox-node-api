const CandidatesSchema = require('../schema/schemaCandidates');
const JobsSchema = require('../schema/schemaJob');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorCandidates{

    //Create a conection between a job and a candidate
    //------------------------------------------------
    static async createConnection(candidateId, jobId, resp,next){

        try{

            if(!candidateId) next( exMsg('Id of candidate was missing',412) );

            const candidateInfo = await CandidatesSchema.findOne({'_id':candidateId});
            await JobsSchema.findByIdAndUpdate(jobId, 
                {$pull:{candidates:{
                        _id:candidateId
                    }}}
                );
            
            await JobsSchema.findByIdAndUpdate( jobId, 
                {$push:{candidates:{
                    _id:candidateInfo._id,
                    name: candidateInfo.name, 
                    email: candidateInfo.email,
                    universityName: candidateInfo.universityName,
                    courseName: candidateInfo.courseName 
                 }}});


            const jobInfo = await JobsSchema.findOne({'_id':jobId});
            await CandidatesSchema.findByIdAndUpdate(candidateId,
                {$pull:{jobs:{
                        _id:jobId
                    }}}
                );
            
            await CandidatesSchema.findByIdAndUpdate( candidateId, 
                {$push:{jobs:{
                    _id:jobInfo._id,
                    name: jobInfo.name,
                    limitDate: jobInfo.limitDate
                }}});
            
            const candidateUpdated = await CandidatesSchema.findOne({'_id':candidateId});
            const jobUpdated = await JobsSchema.findOne({'_id':jobId});

            next([candidateUpdated,jobUpdated]);
        }
        catch(err){
            if(err.name == 'CastError') next( exMsg(404.3,404) );
            if(err.name == 'ValidationError') next( exMsg(err.message,412) );


            console.log(err);
            next( exMsg(500,500) );
        }
        
    }

    //Remove Conections between a job and a candidate
    //-----------------------------------------------
    static async removeConnection(req, resp, next){

        try{            
            const candidateId = req.body._id; 
            const jobId = req.params.jobId;

            if(!candidateId) next( exMsg('Id of candidate was missing',412) );

            //await CandidatesSchema.findOne({'_id':candidateId});
            await JobsSchema.findByIdAndUpdate(jobId, 
                {$pull:{candidates:{
                        _id:candidateId
                    }}}
                );

            //await JobsSchema.findOne({'_id':jobId});
            const candidateUpdated =  await this.removeJobFromCandidate( candidateId, jobId );
            if( !candidateUpdated[error] ){throw(candidateUpdated)}
            
            const jobUpdated = await JobsSchema.findOne({'_id':jobId});

            next({candidate:candidateUpdated,job:jobUpdated});

        }
        catch(err){
            if(err.name == 'CastError') next( exMsg(404.3,404) );
            if(err.name == 'ValidationError') next( exMsg(err.message,412) );
            if(!err.error) next( err.error.message ,err.error.status );
            

            console.log(err);
            next( exMsg(500, 500) );
        }

    }


    static async responseAddJobInCandidate(candidateId,jobId,resp, next){
        const response = await this.addJobInCandidate(candidateId, jobId);
        if(!!response.error){
            next( exMsg( response.error.message, response.status ) );
        }
        next(response);
    }

    static async addJobInCandidate(candidateId, jobId){
        //TODO: CALL a Get JOB to Fill the Function Above
        return await this.upDateRelation( candidateId,{$push:{jobs:{
            _id:job._id,
            name: job.name,
            limitDate: job.limitDate
        }}}, CandidatesSchema);

    }

    static async removeJobFromCandidate(candidateId, jobId){
        return await this.upDateRelation( candidateId,{$pull:{jobs:{_id:jobId}}}, CandidatesSchema);

    }

    static async addCandidateInJob(candidate, jobId){
        return await this.upDateRelation( jobId,{$push:{candidates:{
            _id:candidate._id,
            name: candidate.name, 
            email: candidate.email,
            universityName: candidate.universityName,
            courseName: candidate.courseName 
         }}}, JobsSchema );

    }

    static async removeCandidateFromJob(candidateId, jobId){
        return await this.upDateRelation( jobId,{$pull:{candidates:{_id:candidateId}}}, JobsSchema ) ;

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