const Operator = require('../models/operator/operatorCandidates');


module.exports = (app,Router)=>{

    const router = Router();

    router.get( '/', (req,resp)=>{ Operator.getAll(req,resp)} );

    router.post( '/register', (req,resp)=>{ Operator.createCandidate(req,resp)} );

    router.get( '/candidate/:id', (req,resp)=>{ Operator.routeGetCandidateById(req.param.id,resp)} );

    router.put( '/candidate/:id', (req,resp)=>{ Operator.updateCandidate(req,resp)} );

    router.delete( '/candidate/:id', (req,resp)=>{ Operator.deleteCandidate(req,resp)} );

    return router;
}