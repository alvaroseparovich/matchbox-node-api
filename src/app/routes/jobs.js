const Operator = require('../models/operator/operatorJobs');

module.exports = (app,Router)=>{

    const router = Router();

    router.get( '/', ( req,resp )=>{ Operator.getAll( req,resp )} )

    router.post( '/register', ( req,resp )=>{ Operator.getAll( req,resp )} )

    router.get( '/job/:id', ( req,resp )=>{ Operator.getAll( req,resp )} )

    router.put( '/job/:id', ( req,resp )=>{ Operator.getAll( req,resp )} )

    router.delete( '/job/:id', ( req,resp )=>{ Operator.getAll( req,resp )} )

    return router;
}