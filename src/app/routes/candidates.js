const Operator = require('../models/operator/operatorCandidates');


module.exports = (app,Router)=>{

    const router = Router();

    router.get( '/', (req,resp)=>{ Operator.routerGetAll(req,resp)} );

    router.post( '/register', (req,resp)=>{ Operator.routeCreateCandidate(req.body,resp)} );

    router.get( '/candidate/:id', (req,resp)=>{ Operator.routeGetCandidateById(req.param.id,resp)} );

    router.put( '/candidate/:id', (req,resp)=>{ Operator.routeUpdateCandidate(req,resp)} );

    router.delete( '/candidate/:id', (req,resp)=>{ Operator.routerDeleteCandidate(req.params.id,resp)} );

    return router;
}