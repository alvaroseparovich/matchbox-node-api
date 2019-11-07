const express = require('express');
const router = express.Router();
const Operator = require('../models/operator/operatorJobs');


router.get( '/', (req, resp, next)=>{ Operator.routeGetAll(next)} )

router.post( '/register', (req, resp, next)=>{ Operator.routeCreateJob(req.body, next)} )

router.get( '/job/:id', (req, resp, next)=>{ Operator.routeGetJobById(req.params.id, next)} )

router.put( '/job/:id', (req, resp, next)=>{ Operator.routeUpdateJob(req.body, req.params.id, next)} )

router.delete( '/job/:id', (req, resp, next)=>{ Operator.routeDeleteJob(req.params.id, next)} )

    
module.exports = router;