const express = require('express');
const router = express.Router();
const Operator = require('../models/operator/operatorCandidates');


router.get( '/', (req,resp,next)=>{ Operator.routeGetAll(next)} );

router.post( '/register', (req,resp,next)=>{ Operator.routeCreateCandidate(req.body,next)} );

router.get( '/candidate/:id', (req,resp,next)=>{ Operator.routeGetCandidateById(req.params.id,next)} );

router.put( '/candidate/:id', (req,resp,next)=>{ Operator.routeUpdateCandidate(req.body, req.params.id,next)} );

router.delete( '/candidate/:id', (req,resp,next)=>{ Operator.routeDeleteCandidate(req.params.id,next)} );

module.exports = router;