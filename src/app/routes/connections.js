const Operator = require('../models/operator/operatorConections');

module.exports = (app,Router)=>{

    const router = Router();
    
    router.put( '/add/:jobId', ( req,resp )=>{ Operator.createConnection( req,resp )} )

    router.delete( '/remove/:jobId', ( req,resp )=>{ Operator.removeConnection( req,resp )} )

    return router;
}