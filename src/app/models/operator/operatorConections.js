const CandidatesSchema = require('../schema/schemaCandidates');
const JobsSchema = require('../schema/schemaJob');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorCandidates{

    //Create a conection between a job and a candidate
    //------------------------------------------------
    static async createConnection(candidateId, jobId, resp){

        try{

            if(!candidateId) return resp.status(412).send( exMsg('Id of candidate was missing') );

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

            return resp.send([candidateUpdated,jobUpdated]);
        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.3) );
            if(err.name == 'ValidationError') return resp.status(412).send( exMsg(err.message) );


            console.log(err);
            return resp.status(500).send( exMsg(500) );
        }
        
    }

    //Remove Conections between a job and a candidate
    //-----------------------------------------------
    static async removeConnection(req, resp){

        try{            
            const candidateId = req.body._id; 
            const jobId = req.params.jobId;

            if(!candidateId) return resp.status(412).send( exMsg('Id of candidate was missing') );

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

            return resp.send({candidate:candidateUpdated,job:jobUpdated});

        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.3) );
            if(err.name == 'ValidationError') return resp.status(412).send( exMsg(err.message) );
            if(!err.error) return resp.status(err.error.status).send( err.error.message );
            

            console.log(err);
            return resp.status(500).send( exMsg(500) );
        }

    }

    static async responseAddJobInCandidate(candidateId,jobId,resp){
        const response = await this.addJobInCandidate(candidateId, jobId);
        if(!!response.error){
            return resp.status(response.status).send( exMsg( response.error.message ) );
        }
        return resp.send(response);
    }

    static async addJobInCandidate(candidateId, jobId){
        return await this.upDateRelation( candidateId,{$push:{jobs:{_id:jobId}}}, CandidatesSchema);

    }

    static async removeJobFromCandidate(candidateId, jobId){
        return await this.upDateRelation( candidateId,{$pull:{jobs:{_id:jobId}}}, CandidatesSchema);

    }

    static async addCandidateInJob(candidateId, jobId){
        return await this.upDateRelation( jobId,{$push:{candidates:{_id:candidateId}}}, JobsSchema );

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