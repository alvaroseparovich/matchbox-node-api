const express = require('express');
const router = express.Router();
const Operator = require('../models/operator/operatorJobs');


router.get( '/', (req, resp, next)=>{ Operator.routeGetAll(req, resp, next)} )

router.post( '/register', ( req,resp,next )=>{ Operator.createJob( req,resp,next )} )

router.get( '/job/:id', ( req,resp,next )=>{ Operator.getJobById( req,resp,next )} )

router.put( '/job/:id', ( req,resp,next )=>{ Operator.updateJob( req,resp,next )} )

router.delete( '/job/:id', ( req,resp,next )=>{ Operator.deleteJob( req,resp,next )} )

    
module.exports = router;