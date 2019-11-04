
const Schema = require('../models/schema/schemaCandidates');
const HttpError = require('../infrastruct/httpError');

module.exports = class OperatorCandidates{

    static getAll = async ()=>{
        {
            allCandidates = await Schema.find();
            return resp.send( allCandidates );
        
        }
    }

    static createCandidate = async (candidate)=>{
        
        const emailExists = !!await Schema.findOne({email: cadidate.email});
        if(emailExists) 
            throw new HttpError('This email has already been used', 409);
    
        const newCandidate = await Schema.create(cadidate).catch();
        
        delete newCandidate.password;
        
        return newCandidate;
    }

    static getCandidateById = async (req, resp)=>{

        try{
            candidate = await Schema.find({'_id':req.params.id});

            return resp.send( candidate );

        }
        catch(err){
            return resp.status(400).send({error:'The operation failed'});
        }
    
    }

    static updateCandidate = async (req, resp)=>{

        try{
            result = await Schema.findByIdAndUpdate(req.params.id, req.body);
            //todo: If there is no candidate with this id

            candidateUpdated = await Schema.findOne({'_id':req.params.id});

            return resp.send(candidateUpdated);
        }
        catch(err){
            console.log(err)
            return resp.status(400).send({error:'The operation failed'})
        }
        
    }

    static deleteCandidate = async (req, resp)=>{

        try{
            result = await Schema.findByIdAndDelete(req.params.id);
            //todo: If there is no candidate with this id

            return resp.send(result);
        }
        catch(err){
            return resp.status(400).send({error:'The operation failed'})
        }

    }

}