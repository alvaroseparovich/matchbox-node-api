const SchCandidates = require('../schema/schemaCandidates');
const SchJobs = require('../schema/schemaJob');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorCandidates{

    static createConnection = async (req, resp)=>{

        try{            
            const candidateId = req.body._id; 
            const jobId = req.params.jobId;

            if(!candidateId) return resp.status(412).send( exMsg('Id of candidate was missing') );

            const candidateInfo = await SchCandidates.findOne({'_id':candidateId});
            await SchJobs.findByIdAndUpdate(jobId, 
                {$pull:{candidates:{
                        _id:candidateId
                    }}}
                );
            
            await SchJobs.findByIdAndUpdate( jobId, 
                {$push:{candidates:{
                    _id:candidateInfo._id,
                    name: candidateInfo.name, 
                    email: candidateInfo.email,
                    universityName: candidateInfo.universityName,
                    courseName: candidateInfo.courseName 
                 }}});


            const jobInfo = await SchJobs.findOne({'_id':jobId});
            await SchCandidates.findByIdAndUpdate(candidateId,
                {$pull:{jobs:{
                        _id:jobId
                    }}}
                );
            
            await SchCandidates.findByIdAndUpdate( candidateId, 
                {$push:{jobs:{
                    _id:jobInfo._id,
                    name: jobInfo.name,
                    limitDate: jobInfo.limitDate
                }}});
            
            const candidateUpdated = await SchCandidates.findOne({'_id':candidateId});
            const jobUpdated = await SchJobs.findOne({'_id':jobId});

            return resp.send([candidateUpdated,jobUpdated]);
        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.3) );
            if(err.name == 'ValidationError') return resp.status(412).send( exMsg(err.message) );


            console.log(err)
            return resp.status(500).send( exMsg(500) );
        }
        
    }

}


const removeJobFrom = (func, candidateId, jobId)=>{
    func( candidateId, 
        {$pull:{jobs:{
            _id:jobId
        }}});
}