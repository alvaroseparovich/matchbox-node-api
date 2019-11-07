const express = require('express');
const router = express.Router();
const Operator = require('../models/operator/operatorCandidates');


    router.get( '/', (req,resp,next)=>{ Operator.routerGetAll(req,resp,next)} );

    router.post( '/register', (req,resp,next)=>{ Operator.routeCreateCandidate(req.body,resp,next)} );

    router.get( '/candidate/:id', (req,resp,next)=>{ Operator.routeGetCandidateById(req.params.id,resp,next)} );

    router.put( '/candidate/:id', (req,resp,next)=>{ Operator.routeUpdateCandidate(req,resp,next)} );

    router.delete( '/candidate/:id', (req,resp,next)=>{ Operator.routeDeleteCandidate(req.params.id,resp,next)} );

    module.exports = router;