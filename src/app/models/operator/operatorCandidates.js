const Schema = require('../schema/schemaCandidates');
const exMsg = require('../../infrastruct/exceptionMessage');

module.exports = class OperatorCandidates{

    static getAll = async (req,resp)=>{

        const allCandidates = await Schema.find();

        return resp.status(200).send( allCandidates );
    }

    static createCandidate = async (req, resp)=>{

        try{

            const emailExists = !!await Schema.findOne({email: req.body.email});
            if(emailExists) 
                return resp.status(409).send( exMsg('This email has already been used') );
        
            const newCandidate = await Schema.create(req.body);

            newCandidate.password = undefined;
            
            return resp.send(newCandidate);

        }catch(err){
            if(err.name == 'ValidationError') return resp.status(412).send( exMsg(err.message) );

            console.log(err); 
            return resp.status(500).send( exMsg(500) );}
    }

    static getCandidateById = async (req, resp)=>{

        try{
            const candidate = await Schema.find({'_id':req.params.id});

            return resp.send( candidate );

        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.1) );

            console.log(err); 
            return resp.status(500).send( exMsg(500) );
        }
    
    }

    static updateCandidate = async (req, resp)=>{

        try{
            const result = await Schema.findByIdAndUpdate(req.params.id, req.body);
            
            if( req.body.email )
                return resp.status(409).send( exMsg('You can not change a email. ') );

            //todo: If there is no candidate with this id
            const candidateUpdated = await Schema.findOne({'_id':req.params.id});

            return resp.send(candidateUpdated);
        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.1) );
            if(err.name == 'ValidationError') return resp.status(412).send( exMsg(err.message) );


            console.log(err)
            return resp.status(500).send( exMsg(500) );
        }
        
    }

    static deleteCandidate = async (req, resp)=>{

        try{

            const result = await Schema.findByIdAndDelete(req.params.id);
            
            return resp.send({message:'Candidate Deleted.'});

        }
        catch(err){
            if(err.name == 'CastError') return resp.status(404).send( exMsg(404.1) );

            console.log(err)
            return resp.status(500).send( exMsg(500) );
        }

    }

}