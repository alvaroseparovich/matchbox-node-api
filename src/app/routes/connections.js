const Operator = require('../models/operator/operatorConections');

module.exports = (Router)=>{

    const router = Router();
    
    router.put( '/add/:jobId', ( req,resp )=>{ Operator.createConnection( req.body._id , req.params.jobId , resp )} )

    router.delete( '/remove/:jobId', ( req,resp )=>{ Operator.removeConnection( req,resp )} )

    router.put( '/attatchjob/:jobId', ( req,resp )=>{ Operator.responseAddJobInCandidate( req.body._id , req.params.jobId , resp )} )

    
    return router;
}