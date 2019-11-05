const Operator = require('../models/operator/operatorCandidates');


module.exports = (app,Router)=>{

    const router = Router();

    router.get( '/', (req,resp)=>{Operator.getAll(req,resp)} );
    
    router.post( '/register', (req,resp)=>{ Operator.createCandidate(req,resp)} );

    router.get( '/candidate/:id', (req,resp)=>{ Operator.getCandidateById(req,resp)} );

    router.put( '/candidate/:id', (req,resp)=>{ Operator.updateCandidate(req,resp)} );

    router.delete( '/candidate/:id', (req,resp)=>{ Operator.deleteCandidate(req,resp)} );

    return router;
}