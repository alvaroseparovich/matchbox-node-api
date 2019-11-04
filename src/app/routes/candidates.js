const errorCatcher = require('../infrastruct/errorHandler.decorator')
const Operator = require('../models/operator/operatorCandidates');


module.exports = (app,Router)=>{

    const router = Router();

    router.get( '/', errorCatcher(() => Operator.getAll()) );
    
    router.post( '/register', errorCatcher(( req ) => Operator.createCandidate(req.body)) );

    router.get( '/candidate/:id', errorCatcher(( req, resp ) => Operator.getCandidateById(req, resp)) );

    router.put( '/candidate/:id', errorCatcher(( req, resp ) => Operator.updateCandidate(req,resp)) );

    router.delete( '/candidate/:id', errorCatcher(( req, resp ) => Operator.deleteCandidate(req,resp)) );

    return router;
}