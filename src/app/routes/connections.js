const Operator = require('../models/operator/operatorConections');

module.exports = (app,Router)=>{

    const router = Router();
    
    router.put( '/add/:jobId', ( req,resp )=>{ Operator.createConnection( req,resp )} )

    return router;
}