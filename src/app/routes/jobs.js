const Operator = require('../models/operator/operatorJobs');

module.exports = (app,Router)=>{

    const router = Router();

    router.get( '/', ( req,resp )=>{ Operator.getAll( req,resp )} )

    router.post( '/register', ( req,resp )=>{ Operator.createJob( req,resp )} )

    router.get( '/job/:id', ( req,resp )=>{ Operator.getJobById( req,resp )} )

    router.put( '/job/:id', ( req,resp )=>{ Operator.updateJob( req,resp )} )

    router.delete( '/job/:id', ( req,resp )=>{ Operator.deleteJob( req,resp )} )

    return router;
}